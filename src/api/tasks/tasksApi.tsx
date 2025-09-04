import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/batching";
import { spWebContext, subWebContext } from "src/api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { WorkflowDetails } from "src/components/ViewPCOL/Actions/StartForm/StartWorkflow";
import { usePCOL } from "src/api/PCOL/usePCOL";
import { useStageUpdate } from "./stage";
import { useSendEmail } from "src/api/Email/emailApi";
import Docxtemplater from "docxtemplater";
import PizZip, { Data } from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { useDocuments } from "../documentsApi";
import {
  Link,
  Toast,
  ToastBody,
  ToastTitle,
  ToastTrigger,
  useToastController,
} from "@fluentui/react-components";

const Task = z.object({
  Id: z.number().positive(),
  Title: z.string(),
  pcolId: z.number().int().positive(),
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
export type Task = z.infer<typeof Task>;

export const useTasks = (subSite: string, pcolId: number) => {
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
        .expand("Person", "SkippedBy")
        .filter(`pcolId eq '${pcolId}'`)<Task[]>(),
  });
};

export const useAddTasks = (subSite: string, pcolId: number) => {
  const queryClient = useQueryClient();
  const pcol = usePCOL(subSite, pcolId);
  const documents = useDocuments(subSite, String(pcol.data?.Title));
  const sendEmail = useSendEmail();
  const { dispatchToast } = useToastController("toaster");
  return useMutation({
    mutationFn: async (wfDetails: WorkflowDetails) => {
      const [batched, execute] = subWebContext(subSite).batched();
      const batch = batched.web.lists.getByTitle("tasks");
      let count = 0;

      const document = documents.data?.find(
        (doc) => doc.ListItemAllFields.DocGroup === "PCOL"
      );
      const docRelUrl = document?.ServerRelativeUrl;
      const attachments = documents.data?.filter(
        (doc) => doc.ListItemAllFields.DocGroup === "Attachment"
      );

      let attachmentNames = "";
      if (attachments) {
        for (const att of attachments) {
          attachmentNames += att.Name + "\n";
        }
      }

      if (docRelUrl) {
        PizZipUtils.getBinaryContent(
          docRelUrl,
          async function (error: Error, content: Data) {
            if (error) {
              throw error;
            }
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
              paragraphLoop: true,
              linebreaks: true,
            });

            await doc.renderAsync({
              Attachments: attachmentNames,
            });
            const out = doc.getZip().generate({
              type: "blob",
              mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              compression: "DEFLATE",
            });

            await subWebContext(subSite)
              .web.getFileByServerRelativePath(docRelUrl)
              .setContent(out)
              .catch((reason: Error) => {
                console.log(reason);

                const regex = /"value":"(.*?)"/;
                const match = reason.message.match(regex);

                dispatchToast(
                  <Toast>
                    <ToastTitle
                      action={
                        <ToastTrigger>
                          <Link>Dismiss</Link>
                        </ToastTrigger>
                      }
                    >
                      Error adding links to PCOL file
                    </ToastTitle>
                    <ToastBody>
                      <p>The file is likely being edited by another person.</p>
                      <p>
                        <strong>
                          You will need to add the list of attachments manually.
                        </strong>
                      </p>
                      <p>Error message: {match?.[1]}</p>
                    </ToastBody>
                  </Toast>,
                  { intent: "error", timeout: -1 }
                );
              });
          }
        );
      }

      for (const reviewer of wfDetails.ParallelReviewers) {
        if (reviewer.EMail) {
          count += 1;
          const PersonId = await resolvePerson(reviewer);
          batch.items.add({
            Title: "",
            pcolId: pcolId.toString(),
            PersonId,
            Role: "Parallel",
          });
        }
      }

      let index = 0;
      for (const reviewer of wfDetails.SerialReviewers) {
        if (reviewer.EMail) {
          count += 1;
          const PersonId = await resolvePerson(reviewer);
          batch.items.add({
            Title: String(index),
            pcolId: pcolId.toString(),
            PersonId,
            Role: "Serial",
          });
          index += 1;
        }
      }

      if (count > 0) {
        batch.items.add({
          Title: "",
          pcolId: pcolId.toString(),
          PersonId: pcol.data?.Author.Id,
          Role: "Final",
        });
      }

      if (wfDetails.OrgReviewer?.EMail) {
        const PersonId = await resolvePerson(wfDetails.OrgReviewer);
        batch.items.add({
          Title: "",
          pcolId: pcolId.toString(),
          PersonId,
          Role: "Org",
        });
      }

      if (wfDetails.PCO?.EMail) {
        const PersonId = await resolvePerson(wfDetails.PCO);
        batch.items.add({
          Title: "",
          pcolId: pcolId.toString(),
          PersonId,
          Role: "PCO",
        });
      }

      if (wfDetails.Distributor?.EMail) {
        const PersonId = await resolvePerson(wfDetails.Distributor);
        batch.items.add({
          Title: "",
          pcolId: pcolId.toString(),
          PersonId,
          Role: "Distributor",
        });
      }

      return execute();
    },
    onSuccess: (_data, variables) => {
      let newStage = "Draft";
      const linkText =
        `. Click the link below to complete:<br />` +
        `<a href="${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/p/${subSite}/i/${pcolId}">` +
        `${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/p/${subSite}/i/${pcolId}</a>`;
      const email = {
        To: [] as string[],
        CC: [pcol.data?.Author.EMail ?? ""],
        Subject: `PCOL task assigned for ${pcol.data?.Title}`,
        Body: `You have been assigned as a `,
        pcolId: pcolId,
        Program: subSite,
      };
      if (
        variables.SerialReviewers.length > 0 ||
        variables.ParallelReviewers.length > 0
      ) {
        newStage = "Peer Review";
        if (variables.ParallelReviewers.length > 0) {
          for (const reviewer of variables.ParallelReviewers) {
            email.To.push(reviewer.EMail);
          }
        } else {
          email.To.push(variables.SerialReviewers[0].EMail);
        }
        email.Body += "peer reviewer" + linkText;
      } else if (variables.OrgReviewer) {
        newStage = "Organizational Review";
        email.To.push(variables.OrgReviewer.EMail);
        email.Body += "org reviewer" + linkText;
      } else {
        newStage = "Approval";
        email.To.push(variables.PCO?.EMail ?? "");
        email.Body += "PCO" + linkText;
      }

      sendEmail.mutate(email);

      subWebContext(String(subSite))
        .web.lists.getByTitle("PCOLs")
        .items.getById(pcolId)
        .update({ Stage: newStage })
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: ["PCOL", subSite, pcolId],
          });
        });

      queryClient.invalidateQueries({
        queryKey: ["tasks", subSite, pcolId],
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

export const useUpdateTask = (
  subSite: string,
  pcolId: number,
  taskId: number
) => {
  const queryClient = useQueryClient();
  const stageUpdate = useStageUpdate(subSite, pcolId);
  return useMutation({
    mutationFn: async (newStatus: string) => {
      //Optimistic update
      queryClient.setQueryData(["tasks", subSite, pcolId], (prev: Task[]) => {
        return prev.map((task) =>
          task.Id === taskId ? { ...task, Status: newStatus } : task
        );
      });
      return subWebContext(String(subSite))
        .web.lists.getByTitle("tasks")
        .items.getById(taskId)
        .update({
          Status: newStatus,
          ...(newStatus === "Skipped" && {
            SkippedById: _spPageContextInfo.userId,
          }),
        });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", subSite, pcolId],
      });
    },
    onSuccess: (_result, variables) => {
      stageUpdate.mutate(variables);
    },
  });
};
