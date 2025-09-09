import { Field, ProgressBar } from "@fluentui/react-components";

type ProgressBarColors = "brand" | "success" | "warning" | "error";
type ValidationStates = "success" | "warning" | "error" | "none" | undefined;

export const PCOLProgressBar = ({ stage }: { stage: string }) => {
  let value = 0; // default no progress

  // currently the only colors that matter are brand and success
  // if in the future we want to calculate how "far" a PCOL made
  //   it prior to be rejected/cancelled, the others will matter
  let color: ProgressBarColors = "brand";
  let validationState: ValidationStates = "none";

  switch (stage) {
    case "Draft":
      value = 0.1;
      break;
    case "Peer Review":
      value = 0.2;
      break;
    case "Final Review":
      value = 0.6;
      break;
    case "Orginzational Review":
      value = 0.7;
      break;
    case "Approval":
      value = 0.8;
      break;
    case "Distribution":
      value = 0.9;
      break;
    case "Distributed":
      value = 1.0;
      validationState = "success";
      color = "success";
      break;
    case "Cancelled":
      value = 0;
      validationState = "warning";
      color = "warning";
      break;
    case "Rejected":
      value = 0;
      validationState = "error";
      color = "error";
      break;
  }

  return (
    <Field validationMessage={stage} validationState={validationState}>
      <ProgressBar
        value={value}
        style={{ minWidth: 120 }}
        thickness="large"
        color={color}
      />
    </Field>
  );
};
