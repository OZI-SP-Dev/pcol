import { FormProvider, useForm } from "react-hook-form";
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

const Person = z.object({
  Id: z.string(),
  Title: z.string(),
  EMail: z.string(),
});
type Person = z.infer<typeof Person>;

const WorkflowDetails = z.object({
  ParallelReviewers: z.array(Person).max(10),
  SerialReviewers: z.array(Person).max(10),
  OrgReviewer: Person,
  PCO: Person,
  Distributor: Person,
});

export type WorkflowDetails = z.infer<typeof WorkflowDetails>;

const undefinedPerson = { Id: undefined, Title: undefined, EMail: undefined };

const StartWorkflow = () => {
  const wfForm = useForm<WorkflowDetails>({
    defaultValues: {
      ParallelReviewers: [{ ...undefinedPerson }],
      SerialReviewers: [{ ...undefinedPerson }],
      OrgReviewer: { ...undefinedPerson },
      PCO: { ...undefinedPerson },
      Distributor: { ...undefinedPerson },
    },
    mode: "onChange",
  });
  const { program, pcolId } = useParams();
  const addTasks = useAddTasks(program, pcolId);

  return (
    <FormProvider {...wfForm}>
      <form id="wfForm" style={{ width: "100%" }}>
        <DialogBody>
          <DialogTitle>Send request</DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
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
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                onClick={async (ev) => {
                  await wfForm.trigger();
                  if (wfForm.formState.isValid) {
                    addTasks.mutate(wfForm.getValues());
                  }
                  ev.preventDefault();
                }}
                disabled={addTasks.isPending}
              >
                Send
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </form>
    </FormProvider>
  );
};

export default StartWorkflow;
