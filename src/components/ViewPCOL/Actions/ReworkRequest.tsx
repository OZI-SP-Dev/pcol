import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Dropdown,
  DropdownProps,
  Field,
  Option,
  Textarea,
  TextareaProps,
  Tooltip,
} from "@fluentui/react-components";
import { NavigateBackIcon } from "@fluentui/react-icons-mdl2";
import { useState } from "react";

const standardReasons = [
  "Salary/Incentive Over Cap",
  "Missing Information",
  "Candidate Declined",
  "Candidate Unqualified",
  "No Qualified Candidates",
];

const ReworkRequest = () => {
  const [reason, setReason] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [value, setValue] = useState("");

  const disableReworkButton = true;

  const updateReason: TextareaProps["onChange"] = (_e, data) => {
    setReason(data.value);
  };

  const onOptionSelect: DropdownProps["onOptionSelect"] = (_e, data) => {
    setSelectedOptions(data.selectedOptions);
    setValue(data.optionText ?? "");
  };

  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <Tooltip withArrow content="Rework" relationship="label">
          <Button
            style={{
              border: "none",
              background: "transparent",
              borderRadius: "50%",
            }}
            icon={<NavigateBackIcon className="orange" />}
            size="large"
            disabled={disableReworkButton}
          />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Rework request</DialogTitle>
          <DialogContent>
            <Field label="Standard reasons">
              <Dropdown
                clearable
                onOptionSelect={onOptionSelect}
                selectedOptions={selectedOptions}
                placeholder="Standard Reasons"
              >
                {standardReasons.map((reason) => (
                  <Option key={reason}>{reason}</Option>
                ))}
              </Dropdown>
            </Field>
            <Field label="Rework reason" required={value === ""}>
              <Textarea value={reason} onChange={updateReason} required />
            </Field>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button
                disabled={reason === "" && value === ""}
                appearance="primary"
                // onClick={updateHandler}
              >
                Submit
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default ReworkRequest;
