import { Dropdown, Label, Text } from "@fluentui/react-components";
import { Option } from "@fluentui/react-components";
import { Controller, useFormContext } from "react-hook-form";
import { WorkflowDetails } from "./StartWorkflow";
import { useProgramRoles } from "src/api/Roles/rolesApi";
import { useParams } from "react-router-dom";
import { ContactIcon } from "@fluentui/react-icons-mdl2";

const Distributor = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<WorkflowDetails>();
  const { program } = useParams();
  const programRoles = useProgramRoles(program);

  const distributors = programRoles.data?.filter(
    (role) => role.Title === "Distributor"
  );

  const distributorOptions = () =>
    distributors?.map((role) => {
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
      <Label
        id={"DistributorId"}
        weight="semibold"
        className="fieldLabel"
        required
      >
        <ContactIcon className="fieldIcon" />
        Distributor
      </Label>

      <Controller
        control={control}
        name={"Distributor"}
        rules={{ required: "Distributor is required." }}
        render={({ field }) => (
          <Dropdown
            id="DistributorId"
            name="Distributor"
            aria-describedby={"DistributorErr"}
            aria-invalid={errors?.Distributor ? "true" : "false"}
            value={field.value?.EMail}
            onOptionSelect={(_e, data) => {
              const role = programRoles.data?.find(
                ({ user }) => user.EMail === data.selectedOptions[0]
              );
              field.onChange(role?.user);
            }}
            clearable
          >
            {distributorOptions()}
          </Dropdown>
        )}
      />
      {errors?.Distributor && (
        <Text role="alert" id={"DistributorErr"} className="fieldErrorText">
          {errors.Distributor.message}
        </Text>
      )}
    </div>
  );
};
export default Distributor;
