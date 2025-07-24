import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import "./StartForm.css";
import PeerReviewParallel from "./PeerReviewParallel";
import PeerReviewSerial from "./PeerReviewSerial";
import OrgReviewer from "./OrgReviewer";
import PCO from "./PCO";
import Distributor from "./Distributor";
import {
  Button,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@fluentui/react-components";
import { useAddTasks } from "src/api/tasks/tasksApi";
import { useParams } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect } from "react";

const Person = z.object({
  Id: z.string(),
  Title: z.string(),
  EMail: z.string(),
});
type Person = z.infer<typeof Person>;

const WorkflowDetails = z.object({
  ParallelReviewers: z.array(Person).max(10),
  SerialReviewers: z.array(Person).max(10),
  OrgReviewer: z.nullable(Person),
  PCO: z.nullable(Person),
  Distributor: z.nullable(Person),
});

export type WorkflowDetails = z.infer<typeof WorkflowDetails>;

const StartWorkflow = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const wfForm = useForm<WorkflowDetails>({
    defaultValues: {
      ParallelReviewers: [],
      SerialReviewers: [],
      OrgReviewer: null,
      PCO: null,
      Distributor: null,
    },
  });
  const { program, pcolId } = useParams();
  const addTasks = useAddTasks(program, pcolId);
  const { isValid } = wfForm.formState;

  useEffect(() => {
    if (addTasks.isSuccess) {
      addTasks.reset();
      setOpen(false);
    }
  }, [addTasks, setOpen]);

  const onSubmit: SubmitHandler<WorkflowDetails> = async (data, ev) => {
    if (isValid) {
      await addTasks.mutateAsync(data);
      if (addTasks.isSuccess) {
        setOpen(false);
      }
    }
    ev?.preventDefault();
  };

  return (
    <FormProvider {...wfForm}>
      <form
        id="wfForm"
        style={{ width: "100%" }}
        onSubmit={wfForm.handleSubmit(onSubmit)}
      >
        <DialogBody>
          <DialogTitle>Send request</DialogTitle>
          <DialogContent>
            <div
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              <PeerReviewParallel />
              <PeerReviewSerial />
              <OrgReviewer />
              <PCO />
              <Distributor />
            </div>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            {/* <DialogTrigger disableButtonEnhancement> */}
            <Button
              type="submit"
              appearance="primary"
              disabled={addTasks.isPending}
            >
              Send
            </Button>
            {/* </DialogTrigger> */}
          </DialogActions>
        </DialogBody>
      </form>
    </FormProvider>
  );
};

export default StartWorkflow;
