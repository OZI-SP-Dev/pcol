import { Dropdown, Label, Text } from "@fluentui/react-components";
import { Option } from "@fluentui/react-components";
import { Controller, useFormContext } from "react-hook-form";
import { WorkflowDetails } from "./StartWorkflow";
import { useProgramRoles } from "src/api/Roles/rolesApi";
import { useParams } from "react-router-dom";
import { ContactIcon } from "@fluentui/react-icons-mdl2";

const PCO = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<WorkflowDetails>();
  const { program } = useParams();
  const programRoles = useProgramRoles(program);

  const pcos = programRoles.data?.filter((role) => role.Title === "CO");

  const pcoOptions = () =>
    pcos?.map((role) => {
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
      <Label id={"PCOId"} weight="semibold" className="fieldLabel" required>
        <ContactIcon className="fieldIcon" />
        PCO
      </Label>

      <Controller
        control={control}
        name={"PCO"}
        rules={{ required: "PCO is Required" }}
        render={({ field }) => (
          <Dropdown
            id="PCOId"
            name="PCO"
            aria-describedby={"PCOErr"}
            aria-invalid={errors?.PCO ? "true" : "false"}
            value={field.value?.EMail}
            onOptionSelect={(_e, data) => {
              const role = programRoles.data?.find(
                ({ user }) => user.EMail === data.selectedOptions[0]
              );
              field.onChange(role?.user);
            }}
            clearable
          >
            {pcoOptions()}
          </Dropdown>
        )}
      />
      {errors?.PCO && (
        <Text role="alert" id={"PCOErr"} className="fieldErrorText">
          {errors.PCO.message}
        </Text>
      )}
    </div>
  );
};
export default PCO;
