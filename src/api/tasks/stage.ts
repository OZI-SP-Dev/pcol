import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subWebContext } from "src/api/SPWebContext";
import { useTasks } from "./tasksApi";
import { usePCOL } from "src/api/PCOL/usePCOL";
import { useSendEmail } from "src/api/Email/emailApi";

const ApprovedOrSkipped = ["Approved", "Skipped"];

export const useStageUpdate = (subSite: string, pcolId: number) => {
  const queryClient = useQueryClient();
  const pcol = usePCOL(subSite, pcolId);
  const tasks = useTasks(subSite, pcolId);
  const sendTaskEmails = useStageUpdateEmail(subSite, pcolId);
  const stage = pcol.data?.Stage;

  return useMutation({
    mutationFn: async (newStage: string) => {
      let updateNeeded = "";

      if (newStage === "Rejected" || newStage === "Cancelled") {
        if (newStage === "Rejected") {
          sendTaskEmails.mutate(newStage);
        }
        return subWebContext(subSite)
          .web.lists.getByTitle("pcols")
          .items.getById(pcolId)
          .update({ Stage: newStage });
      }

      const prTasks = tasks.data?.filter(
        (task) => task.Role === "Parallel" || task.Role === "Serial"
      );
      const finalTasks = tasks.data?.filter((task) => task.Role === "Final");
      const orgTasks = tasks.data?.filter((task) => task.Role === "Org");
      const pcoTasks = tasks.data?.filter((task) => task.Role === "PCO");
      const distributionTasks = tasks.data?.filter(
        (task) => task.Role === "Distributor"
      );

      switch (stage) {
        case "Peer Review":
          if (prTasks) {
            const approvedTasks = prTasks.filter((task) =>
              ApprovedOrSkipped.includes(task.Status ?? "")
            );
            if (prTasks.length === approvedTasks.length) {
              updateNeeded = "Final Review";
            }
          }
          break;

        case "Final Review":
          if (finalTasks) {
            const approvedTasks = finalTasks.filter((task) =>
              ApprovedOrSkipped.includes(task.Status ?? "")
            );
            if (finalTasks.length === approvedTasks.length) {
              if (orgTasks?.length) {
                updateNeeded = "Organizational Review";
              } else {
                updateNeeded = "Approval";
              }
            }
          }
          break;

        case "Organizational Review":
          if (orgTasks) {
            const approvedTasks = orgTasks.filter((task) =>
              ApprovedOrSkipped.includes(task.Status ?? "")
            );
            if (orgTasks.length === approvedTasks.length) {
              updateNeeded = "Approval";
            }
          }
          break;

        case "Approval":
          if (pcoTasks) {
            const approvedTasks = pcoTasks.filter((task) =>
              ApprovedOrSkipped.includes(task.Status ?? "")
            );
            if (pcoTasks.length === approvedTasks.length) {
              updateNeeded = "Distribution";
            }
          }
          break;

        case "Distribution":
          if (distributionTasks) {
            const approvedTasks = distributionTasks.filter((task) =>
              ApprovedOrSkipped.includes(task.Status ?? "")
            );
            if (distributionTasks.length === approvedTasks.length) {
              updateNeeded = "Distributed";
            }
          }
          break;
      }

      if (!updateNeeded) {
        return Promise.resolve();
      }
      sendTaskEmails.mutate(updateNeeded);
      return subWebContext(subSite)
        .web.lists.getByTitle("pcols")
        .items.getById(pcolId)
        .update({ Stage: updateNeeded });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["PCOL", subSite, pcolId],
      }),
  });
};

const useStageUpdateEmail = (subSite: string, pcolId: number) => {
  const sendEmail = useSendEmail();
  const pcol = usePCOL(subSite, pcolId);
  const tasks = useTasks(subSite, pcolId);

  return useMutation({
    mutationFn: async (stage: string) => {
      const parallelTasks = tasks.data?.filter(
        (task) => task.Role === "Parallel"
      );
      const serialTasks = tasks.data?.filter((task) => task.Role === "Serial");
      const orgTasks = tasks.data?.filter((task) => task.Role === "Org");
      const pcoTasks = tasks.data?.filter((task) => task.Role === "PCO");
      const distributionTasks = tasks.data?.filter(
        (task) => task.Role === "Distributor"
      );

      const linkText =
        `Click the link below to complete:<br />` +
        `<a href="${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/p/${subSite}/i/${pcolId}">` +
        `${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/p/${subSite}/i/${pcolId}</a>`;

      switch (stage) {
        case "Peer Review": {
          let parallelTasksComplete = false;
          if (parallelTasks) {
            const approvedTasks = parallelTasks.filter((task) =>
              ApprovedOrSkipped.includes(task.Status ?? "")
            );
            if (parallelTasks.length === approvedTasks.length) {
              parallelTasksComplete = true;
            }
          }
          if (!parallelTasks || parallelTasksComplete) {
            if (serialTasks) {
              const nextTask = serialTasks.find((task) => !task.Status);
              const email = {
                To: [nextTask?.Person.EMail ?? ""],
                CC: [pcol.data?.Author.EMail ?? ""],
                Subject: `PCOL task assigned for ${pcol.data?.Title}`,
                Body: `You have been assigned as a reviewer. ` + linkText,
                pcolId: pcolId,
                Program: subSite,
              };
              return sendEmail.mutate(email);
            }
          }
          break;
        }

        case "Final Review": {
          const email = {
            To: [pcol.data?.Author.EMail ?? ""],
            Subject: `PCOL task assigned for ${pcol.data?.Title}`,
            Body: `You have been assigned as the final reviewer. ` + linkText,
            pcolId: pcolId,
            Program: subSite,
          };
          return sendEmail.mutate(email);
        }

        case "Organizational Review": {
          const email = {
            To: [orgTasks?.[0].Person.EMail ?? ""],
            CC: [pcol.data?.Author.EMail ?? ""],
            Subject: `PCOL task assigned for ${pcol.data?.Title}`,
            Body: `You have been assigned as the reviewer. ` + linkText,
            pcolId: pcolId,
            Program: subSite,
          };
          return sendEmail.mutate(email);
        }

        case "Approval": {
          const email = {
            To: [pcoTasks?.[0].Person.EMail ?? ""],
            CC: [pcol.data?.Author.EMail ?? ""],
            Subject: `PCOL task assigned for ${pcol.data?.Title}`,
            Body: `You have been assigned as the PCO. ` + linkText,
            pcolId: pcolId,
            Program: subSite,
          };
          return sendEmail.mutate(email);
        }

        case "Distribution": {
          const email = {
            To: [distributionTasks?.[0].Person.EMail ?? ""],
            CC: [pcol.data?.Author.EMail ?? ""],
            Subject: `PCOL task assigned for ${pcol.data?.Title}`,
            Body: `You have been assigned as the distributor. ` + linkText,
            pcolId: pcolId,
            Program: subSite,
          };
          return sendEmail.mutate(email);
        }

        case "Rejected": {
          const email = {
            To: [pcol.data?.Author.EMail ?? ""],
            Subject: `PCOL Rejected: ${pcol.data?.Title}`,
            Body:
              `This PCOL was rejected by the PCO.<br />Click to view:<br />` +
              `<a href="${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/p/${subSite}/i/${pcolId}">` +
              `${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/p/${subSite}/i/${pcolId}</a>`,
            pcolId: pcolId,
            Program: subSite,
          };
          return sendEmail.mutate(email);
        }
      }
    },
  });
};
