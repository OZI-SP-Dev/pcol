import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Text,
  Tooltip,
} from "@fluentui/react-components";
import { ArrowResetFilled } from "@fluentui/react-icons";
import { useState } from "react";
import usePCOLParams from "src/components/pcolParams";
import { useAddNote } from "src/api/Notes/notesApi";
import { usePCOL } from "src/api/PCOL/usePCOL";
import { useResetPCOL } from "src/api/PCOL/useResetPCOL";
import { useTasks } from "src/api/tasks/tasksApi";

const ResetStages = ["Rejected", "Cancelled"];

const ResetRequest = () => {
  const [open, setOpen] = useState(false);
  const { program, pcolId } = usePCOLParams();
  const pcol = usePCOL(program, pcolId);
  const tasks = useTasks(program, pcolId);
  const addNote = useAddNote(program, pcolId);
  const resetPcol = useResetPCOL(program, pcolId);

  const updateHandler = async () => {
    await addNote.mutateAsync(`PCOL Workflow Reset`);
    await resetPcol.mutateAsync().then(() => setOpen(false));
  };

  const pco = tasks.data?.find((task) => task.Role === "PCO");

  const isDone = ResetStages.includes(pcol.data?.Stage ?? "");
  const isReseter =
    pcol.data?.Author.Id === _spPageContextInfo.userId ||
    pco?.Person.Id === _spPageContextInfo.userId;
  const disabled = !isDone || !isReseter;

  return (
    <Dialog
      modalType="alert"
      open={open}
      onOpenChange={(_e, data) => setOpen(data.open)}
    >
      <DialogTrigger disableButtonEnhancement>
        <Tooltip withArrow content="Reset" relationship="label">
          <Button
            style={{
              border: "none",
              background: "transparent",
              borderRadius: "50%",
            }}
            icon={<ArrowResetFilled className={disabled ? "" : "orange"} />}
            size="large"
            disabled={disabled}
          />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Reset PCOL Workflow</DialogTitle>
          <DialogContent>
            Are you sure you wish to reset this PCOL's workflow?
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <Button
              appearance="primary"
              onClick={updateHandler}
              disabled={resetPcol.isPending}
            >
              Submit
            </Button>
            <Text role="alert" className="fieldErrorText">
              {resetPcol.error?.message}
            </Text>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default ResetRequest;
