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
import { DeleteIcon } from "@fluentui/react-icons-mdl2";
import usePCOLParams from "src/components/pcolParams";
import { useAddNote } from "src/api/Notes/notesApi";
import { usePCOL } from "src/api/PCOL/usePCOL";
import { useStageUpdate } from "src/api/tasks/stage";
import { useInvalidateTasks } from "src/api/tasks/tasksApi";
import { useMyRoles } from "src/api/Roles/rolesApi";

const NonCancellableStages = ["Rejected", "Cancelled", "Distributed"];

const CancelRequest = () => {
  const { program, pcolId } = usePCOLParams();
  const roles = useMyRoles(program);
  const pcol = usePCOL(program, pcolId);
  const addNote = useAddNote(program, pcolId);
  const stageUpdate = useStageUpdate(program, pcolId);
  const invalidateTasks = useInvalidateTasks(program, pcolId);
  const cancelHandler = async () => {
    await addNote.mutateAsync(`PCOL Cancelled`);
    await stageUpdate.mutateAsync("Cancelled");
    await invalidateTasks.mutateAsync("Cancelled");
  };

  const cantCancel = NonCancellableStages.includes(pcol.data?.Stage ?? "");
  const isAuthor = pcol.data?.Author.Id === _spPageContextInfo.userId;
  const disabled = cantCancel || !(isAuthor || roles.isAdmin);

  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <Tooltip withArrow content="Cancel Request" relationship="label">
          <Button
            style={{
              border: "none",
              background: "transparent",
              borderRadius: "50%",
            }}
            icon={<DeleteIcon className={disabled ? "" : "red"} />}
            size="large"
            disabled={disabled}
          />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Cancel request</DialogTitle>
          <DialogContent>
            Are you sure you wish to cancel this request?
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">No</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" onClick={cancelHandler}>
                Cancel Request
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default CancelRequest;
