import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Tooltip,
} from "@fluentui/react-components";
import { EditIcon } from "@fluentui/react-icons-mdl2";
import { useState } from "react";
import { usePCOL } from "src/api/PCOL/usePCOL";
import { useMyRoles } from "src/api/Roles/rolesApi";
import { useTasks } from "src/api/tasks/tasksApi";
import usePCOLParams from "src/components/pcolParams";
import EditDistributor from "./EditReviewers/EditDistributor";
import EditPCO from "./EditReviewers/EditPCO";
import EditOrgReviewer from "./EditReviewers/EditOrgReviewer";

const NoEditStages = ["Rejected", "Cancelled", "Distributed"];

const canUpdateReviewer = (currentStage: string, reviewerStage: string) => {
  switch (currentStage) {
    // case "Peer Review":
    // case "Final Review":
    case "Organizational Review":
      if (["Org", "PCO", "Distributor"].includes(reviewerStage)) {
        return true;
      }
      break;
    case "Approval":
      if (["PCO", "Distributor"].includes(reviewerStage)) {
        return true;
      }
      break;
    case "Distribution":
      if (["Distributor"].includes(reviewerStage)) {
        return true;
      }
      break;
  }
  return false;
};

const EditRequest = () => {
  const [open, setOpen] = useState(false);
  const { program, pcolId } = usePCOLParams();
  const tasks = useTasks(program, pcolId);
  const pcol = usePCOL(program, pcolId);
  const roles = useMyRoles(program);

  const cannotEdit = NoEditStages.includes(pcol.data?.Stage ?? "");
  const isAuthor = pcol.data?.Author.Id === _spPageContextInfo.userId;
  const disabled = cannotEdit || !(isAuthor || roles.isAdmin);

  const orgReviewerTask =
    tasks.data?.filter((task) => task.Role === "Org").at(0) || null;
  const pcoTask =
    tasks.data?.filter((task) => task.Role === "PCO").at(0) || null;
  const distributorTask =
    tasks.data?.filter((task) => task.Role === "Distributor").at(0) || null;

  return (
    <Dialog
      modalType="alert"
      open={open}
      onOpenChange={(_e, data) => {
        setOpen(data.open);
      }}
    >
      <DialogTrigger disableButtonEnhancement>
        <Tooltip withArrow content="Edit" relationship="label">
          <Button
            style={{
              border: "none",
              background: "transparent",
              borderRadius: "50%",
            }}
            icon={<EditIcon className={disabled ? "" : "blue"} />}
            size="large"
            disabled={disabled}
          />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <form id="wfEditForm" style={{ width: "100%" }}>
          <DialogBody>
            <DialogTitle>Edit PCOL Workflow</DialogTitle>
            <DialogContent>
              <div
                style={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                {canUpdateReviewer(pcol.data?.Stage || "", "Org") &&
                orgReviewerTask ? (
                  <EditOrgReviewer task={orgReviewerTask} />
                ) : (
                  <>
                    <br />
                    Org Reviewer cannot be changed at this time
                    <br />
                  </>
                )}

                {canUpdateReviewer(pcol.data?.Stage || "", "PCO") && pcoTask ? (
                  <EditPCO task={pcoTask} />
                ) : (
                  <>
                    <br />
                    PCO cannot be changed at this time
                    <br />
                  </>
                )}

                {canUpdateReviewer(pcol.data?.Stage || "", "Distributor") &&
                distributorTask ? (
                  <EditDistributor task={distributorTask} />
                ) : (
                  <>
                    <br />
                    Distributor cannot be changed at this time
                    <br />
                  </>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="primary">Close</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default EditRequest;
