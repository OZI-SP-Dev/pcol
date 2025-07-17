import { Button, Label, Text } from "@fluentui/react-components";
import { ContactIcon } from "@fluentui/react-icons-mdl2";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { PeoplePicker } from "src/components/PeoplePicker/PeoplePicker";
import { WorkflowDetails } from "./StartWorkflow";

const PeerReviewSerial = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<WorkflowDetails>();
  const { fields, append, remove, swap } = useFieldArray({
    name: "SerialReviewers",
    control: control,
  });

  return (
    <fieldset className="startFieldContainer">
      <legend>Serial Reviewers</legend>
      {fields.map((thisfield, index) => {
        return (
          <div key={thisfield.id} className="startFieldContainer">
            <Label
              id={"PRS" + thisfield.id}
              weight="semibold"
              className="fieldLabel"
            >
              <ContactIcon className="fieldIcon" />
              Serial Reviewer {index + 1}
            </Label>

            <Controller
              control={control}
              name={`SerialReviewers.${index}`}
              render={({ field }) => (
                <PeoplePicker
                  ariaLabel={"Serial Reviewer " + (index + 1)}
                  aria-describedby={"PRS" + thisfield.id + "Err"}
                  aria-labelledby={"PRS" + thisfield.id}
                  aria-invalid={
                    errors?.SerialReviewers?.[index] ? "true" : "false"
                  }
                  selectedItems={field.value.EMail ? field.value : []}
                  updatePeople={(items) => {
                    if (items?.[0]?.Title) {
                      field.onChange(items[0]);
                    } else {
                      field.onChange([]);
                    }
                  }}
                />
              )}
            />
            <div>
              <Button
                type="button"
                onClick={() => remove(index)}
                disabled={fields.length <= 1}
              >
                Delete Row
              </Button>
              <Button
                type="button"
                onClick={() => swap(index, index - 1)}
                disabled={index === 0}
              >
                Move Up
              </Button>
              <Button
                type="button"
                onClick={() => swap(index, index + 1)}
                disabled={index === fields.length - 1}
              >
                Move Down
              </Button>
            </div>
            {errors?.SerialReviewers?.[index] && (
              <Text
                role="alert"
                id={"PRS" + thisfield.id + "Err"}
                className="fieldErrorText"
              >
                {errors?.SerialReviewers?.[index]?.message}
              </Text>
            )}
          </div>
        );
      })}
      <br />
      {fields.length < 10 && (
        <Button
          type="button"
          onClick={
            () =>
              append({
                Id: "",
                Title: "",
                EMail: "",
              })
            // append([])
          }
        >
          Add Serial Reviewer
        </Button>
      )}
    </fieldset>
  );
};
export default PeerReviewSerial;
