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
import { AcceptIcon } from "@fluentui/react-icons-mdl2";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddNote } from "src/api/Notes/notesApi";
import { Task, useUpdateTask } from "src/api/tasks/tasksApi";

const ApproveButton = ({ task }: { task: Task }) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const { program, pcolId } = useParams();
  const updateTask = useUpdateTask(String(program), Number(pcolId), task.Id);
  const addNote = useAddNote(String(program), Number(pcolId));

  const updateReason: TextareaProps["onChange"] = (_e, data) => {
    setReason(data.value);
  };

  const updateHandler = async () => {
    await addNote.mutateAsync(`Approved (${task.Role}): ${reason}`);
    await updateTask.mutateAsync("Approved");
  };

  return (
    <Dialog
      modalType="alert"
      open={open}
      onOpenChange={(_e, data) => setOpen(data.open)}
    >
      <DialogTrigger disableButtonEnhancement>
        <Tooltip withArrow content="Approve" relationship="label">
          <Button appearance="primary" icon={<AcceptIcon />} size="large" />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Accept request</DialogTitle>
          <DialogContent>
            <Field label="Reason">
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
              disabled={updateTask.isPending || addNote.isPending}
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

export default ApproveButton;
