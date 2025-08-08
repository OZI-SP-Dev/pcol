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
import { SkipForwardTabFilled } from "@fluentui/react-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddNote } from "src/api/Notes/notesApi";
import { Task, useUpdateTask } from "src/api/tasks/tasksApi";

const SkipButton = ({ task }: { task: Task }) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const { program, pcolId } = useParams();
  const updateTask = useUpdateTask(String(program), Number(pcolId), task.Id);
  const addNote = useAddNote(String(program), Number(pcolId));

  const updateReason: TextareaProps["onChange"] = (_e, data) => {
    setReason(data.value);
  };

  const updateHandler = async () => {
    await addNote.mutateAsync(`Skipped (${task.Role}): ${reason}`);
    await updateTask.mutateAsync("Skipped");
  };

  return (
    <Dialog
      modalType="alert"
      open={open}
      onOpenChange={(_e, data) => setOpen(data.open)}
    >
      <DialogTrigger disableButtonEnhancement>
        <Tooltip withArrow content="Skip" relationship="label">
          <Button
            appearance="primary"
            icon={<SkipForwardTabFilled />}
            size="large"
          />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Skip Approval</DialogTitle>
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

export default SkipButton;
