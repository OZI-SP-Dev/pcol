import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Textarea,
  TextareaProps,
  Tooltip,
} from "@fluentui/react-components";
import { EntryDeclineIcon } from "@fluentui/react-icons-mdl2";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddNote } from "src/api/Notes/notesApi";
import { Task, useUpdateTask } from "src/api/tasks/tasksApi";

const RejectButton = ({ task }: { task: Task }) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const { program, pcolId } = useParams();
  const updateTask = useUpdateTask(String(program), Number(pcolId), task.Id);
  const addNote = useAddNote(String(program), Number(pcolId));

  const updateReason: TextareaProps["onChange"] = (_e, data) => {
    setReason(data.value);
  };

  const updateHandler = async () => {
    await addNote.mutateAsync("REJECTED: " + reason);
    await updateTask.mutateAsync("Rejected");
  };

  return (
    <Dialog
      modalType="alert"
      open={open}
      onOpenChange={(_e, data) => setOpen(data.open)}
    >
      <DialogTrigger disableButtonEnhancement>
        <Tooltip withArrow content="Reject" relationship="label">
          <Button
            style={{
              border: "none",
              background: "transparent",
              borderRadius: "50%",
              color: "indianred",
            }}
            icon={<EntryDeclineIcon />}
            size="large"
          />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Rework request</DialogTitle>
          <DialogContent>
            <Field label="Rework reason" required>
              <Textarea value={reason} onChange={updateReason} required />
            </Field>
            {((addNote.isError || updateTask.isError) &&
              addNote.error?.message) ||
              updateTask.error?.message}
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <Button
              disabled={
                reason === "" || updateTask.isPending || addNote.isPending
              }
              appearance="primary"
              onClick={updateHandler}
            >
              Submit
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default RejectButton;
