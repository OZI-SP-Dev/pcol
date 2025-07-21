import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/batching";
import { spWebContext, subWebContext } from "src/api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { WorkflowDetails } from "src/components/ViewPCOL/Actions/StartForm/StartWorkflow";

const Task = z.object({
  Id: z.number().positive(),
  Title: z.string(),
  pcolId: z.string(),
  Person: z.object({
    Id: z.number().int().positive(),
    Title: z.string(),
    EMail: z.string(),
  }),
  Role: z.string(),
  Status: z.string().optional(),
  SkippedBy: z
    .object({
      Id: z.number().int().positive(),
      Title: z.string(),
      EMail: z.string(),
    })
    .optional(),
  Modified: z.coerce.date().optional(),
});
type Task = z.infer<typeof Task>;

export const useTasks = (subSite: string, pcolId: string) => {
  return useQuery({
    queryKey: ["tasks", subSite, pcolId],
    queryFn: () =>
      subWebContext(subSite)
        .web.lists.getByTitle("tasks")
        .items.select(
          "Id",
          "Title",
          "pcolId",
          "Person/Id",
          "Person/Title",
          "Person/EMail",
          "Role",
          "Status",
          "SkippedBy/Id",
          "SkippedBy/Title",
          "SkippedBy/EMail",
          "Modified"
        )
        .expand("Person", "SkippedBy")<Task[]>(),
  });
};

export const useAddTasks = (subSite?: string, pcolId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (wfDetails: WorkflowDetails) => {
      if (!subSite) {
        return Promise.reject("Invalid site");
      }
      if (!pcolId) {
        return Promise.reject("Invalid PCOL");
      }
      const [batched, execute] = subWebContext(subSite).batched();
      const batch = batched.web.lists.getByTitle("tasks");

      for (const reviewer of wfDetails.ParallelReviewers) {
        if (reviewer.EMail) {
          const PersonId = await resolvePerson(reviewer);
          batch.items.add({
            Title: "",
            pcolId,
            PersonId,
            Role: "Parallel",
          });
        }
      }

      let index = 0;
      for (const reviewer of wfDetails.SerialReviewers) {
        if (reviewer.EMail) {
          const PersonId = await resolvePerson(reviewer);
          batch.items.add({
            Title: String(index),
            pcolId,
            PersonId,
            Role: "Serial",
          });
          index += 1;
        }
      }

      if (wfDetails.OrgReviewer?.EMail) {
        const PersonId = await resolvePerson(wfDetails.OrgReviewer);
        batch.items.add({
          Title: "",
          pcolId,
          PersonId,
          Role: "Org",
        });
      }

      if (wfDetails.PCO?.EMail) {
        const PersonId = await resolvePerson(wfDetails.PCO);
        batch.items.add({
          Title: "",
          pcolId,
          PersonId,
          Role: "PCO",
        });
      }

      if (wfDetails.Distributor?.EMail) {
        const PersonId = await resolvePerson(wfDetails.Distributor);
        batch.items.add({
          Title: "",
          pcolId,
          PersonId,
          Role: "Distributor",
        });
      }

      return execute();
    },
    onSuccess: (_data, variables) => {
      let newStage = "Draft";
      if (
        variables.SerialReviewers.length > 0 ||
        variables.ParallelReviewers.length > 0
      ) {
        newStage = "Peer Review";
      } else if (variables.OrgReviewer) {
        newStage = "Organizational Review";
      } else {
        newStage = "Approval";
      }

      subWebContext(String(subSite))
        .web.lists.getByTitle("PCOLs")
        .items.getById(Number(pcolId))
        .update({ Stage: newStage })
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: ["PCOL", subSite, Number(pcolId)],
          });
        });
    },
  });
};

const resolvePerson = async (person: {
  Id: string;
  Title: string;
  EMail: string;
}) => {
  if (person.Id === "-1") {
    return (await spWebContext.web.ensureUser(person.EMail)).Id;
  } else return Number(person.Id);
};
