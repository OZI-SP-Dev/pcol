import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/batching";
import { spWebContext, subWebContext } from "src/api/SPWebContext";
import { useMutation, useQuery } from "@tanstack/react-query";
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

      wfDetails.ParallelReviewers.forEach(async (reviewer) => {
        if (reviewer.EMail) {
          batch.items.add({
            Title: "",
            pcolId,
            PersonId: await resolvePerson(reviewer),
            Role: "Parallel",
          });
        }
      });

      wfDetails.SerialReviewers.forEach(async (reviewer, index) => {
        if (reviewer.EMail) {
          batch.items.add({
            Title: String(index),
            pcolId,
            PersonId: await resolvePerson(reviewer),
            Role: "Serial",
          });
        }
      });

      if (wfDetails.OrgReviewer.EMail) {
        batch.items.add({
          Title: "",
          pcolId,
          PersonId: await resolvePerson(wfDetails.OrgReviewer),
          Role: "Org",
        });
      }

      batch.items.add({
        Title: "",
        pcolId,
        PersonId: await resolvePerson(wfDetails.PCO),
        Role: "PCO",
      });

      batch.items.add({
        Title: "",
        pcolId,
        PersonId: await resolvePerson(wfDetails.Distributor),
        Role: "Distributor",
      });

      return execute();
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
