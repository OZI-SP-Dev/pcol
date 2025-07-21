import { Label, Text } from "@fluentui/react-components";
import { ContactIcon } from "@fluentui/react-icons-mdl2";
import { Controller, useFormContext } from "react-hook-form";
import { PeoplePicker } from "src/components/PeoplePicker/PeoplePicker";
import { WorkflowDetails } from "./StartWorkflow";

const PeerReviewParallel = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<WorkflowDetails>();

  return (
    <div className="startFieldContainer">
      <Label id={"PRP"} weight="semibold" className="fieldLabel">
        <ContactIcon className="fieldIcon" />
        Parallel Reviewers (select up to 10)
      </Label>

      <Controller
        control={control}
        name={`ParallelReviewers`}
        render={({ field: { onChange, value } }) => (
          <PeoplePicker
            ariaLabel={"Parallel Reviewers"}
            aria-describedby={"PRPErr"}
            aria-labelledby={"PRP"}
            aria-invalid={errors?.ParallelReviewers ? "true" : "false"}
            itemLimit={10}
            selectedItems={value?.[0]?.EMail ? value : []}
            updatePeople={(items) => {
              if (items?.[0]?.Title) {
                onChange(items);
              } else {
                onChange([]);
              }
            }}
          />
        )}
      />
      {errors?.ParallelReviewers && (
        <Text role="alert" id={"PRPErr"} className="fieldErrorText">
          {errors?.ParallelReviewers?.message}
        </Text>
      )}
    </div>
  );
};
export default PeerReviewParallel;
