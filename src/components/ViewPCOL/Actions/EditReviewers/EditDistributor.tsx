import { Button, Dropdown, Label } from "@fluentui/react-components";
import { Option } from "@fluentui/react-components";
import { useProgramRoles } from "src/api/Roles/rolesApi";
import { ContactIcon } from "@fluentui/react-icons-mdl2";
import { useState } from "react";
import { Task, useReassignTask } from "src/api/tasks/tasksApi";
import usePCOLParams from "src/components/pcolParams";

const EditDistributor = ({ task }: { task: Task }) => {
  const { program } = usePCOLParams();
  const programRoles = useProgramRoles(program);
  const [person, setPerson] = useState(task.Person);

  const distributors = programRoles.data
    ?.filter((role) => role.Title.toUpperCase() === "DISTRIBUTOR")
    .map((dist) => dist.user);

  const distributorOptions = () =>
    distributors?.map((person) => {
      return (
        <Option key={person.Id} text={person.Title} value={person.EMail}>
          {person.Title}
        </Option>
      );
    });

  const reassignTask = useReassignTask(program, task.Id);

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

      <Dropdown
        id="DistributorId"
        name="Distributor"
        value={person.Title}
        onOptionSelect={(_e, data) => {
          const distributor = distributors?.find(
            (user) => user.EMail === data.selectedOptions[0],
          );
          setPerson(distributor || task.Person);
        }}
      >
        {distributorOptions()}
      </Dropdown>
      <Button
        appearance="primary"
        onClick={() => reassignTask.mutate(person.Id)}
      >
        Update
      </Button>
    </div>
  );
};
export default EditDistributor;
