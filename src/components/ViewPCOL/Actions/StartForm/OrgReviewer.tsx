import { Dropdown, Label, Text } from "@fluentui/react-components";
import { Option } from "@fluentui/react-components";
import { Controller, useFormContext } from "react-hook-form";
import { WorkflowDetails } from "./StartWorkflow";
import { useProgramRoles } from "src/api/Roles/rolesApi";
import { useParams } from "react-router-dom";
import { ContactIcon } from "@fluentui/react-icons-mdl2";

const OrgReviewer = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<WorkflowDetails>();
  const { program } = useParams();
  const programRoles = useProgramRoles(program);

  const reviewers = programRoles.data?.filter(
    (role) => role.Title === "Reviewer"
  );

  const reviewerOptions = () =>
    reviewers?.map((role) => {
      return (
        <Option
          key={String(role.user.Id)}
          text={role.user.Title}
          value={role.user.EMail}
        >
          {role.user.Title}
        </Option>
      );
    });

  return (
    <div className="startFieldContainer">
      <Label id={"OrgReviewerId"} weight="semibold" className="fieldLabel">
        <ContactIcon className="fieldIcon" />
        Org Reviewer
      </Label>

      <Controller
        control={control}
        name={"OrgReviewer"}
        render={({ field }) => (
          <Dropdown
            id="OrgReviewerId"
            name="OrgReviewer"
            value={field.value.EMail}
            onOptionSelect={(_e, data) => {
              const role = programRoles.data?.find(
                ({ user }) => user.EMail === data.selectedOptions[0]
              );
              field.onChange(role?.user);
            }}
            clearable
          >
            {reviewerOptions()}
          </Dropdown>
        )}
      />
      {errors?.OrgReviewer && (
        <Text role="alert" id={"OrgReviewerErr"} className="fieldErrorText">
          {errors?.OrgReviewer?.message}
        </Text>
      )}
    </div>
  );
};
export default OrgReviewer;
