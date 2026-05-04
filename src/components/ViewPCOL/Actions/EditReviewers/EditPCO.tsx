import { Button, Dropdown, Label } from "@fluentui/react-components";
import { Option } from "@fluentui/react-components";
import { useProgramRoles } from "src/api/Roles/rolesApi";
import { ContactIcon } from "@fluentui/react-icons-mdl2";
import { useState } from "react";
import { Task, useReassignTask } from "src/api/tasks/tasksApi";
import usePCOLParams from "src/components/pcolParams";

const EditPCO = ({ task }: { task: Task }) => {
  const { program } = usePCOLParams();
  const programRoles = useProgramRoles(program);
  const [person, setPerson] = useState(task.Person);

  const pcos = programRoles.data
    ?.filter((role) => role.Title === "CO")
    .map((role) => role.user);

  const pcoOptions = () =>
    pcos?.map((person) => {
      return (
        <Option key={person.Id} text={person.Title} value={person.EMail}>
          {person.Title}
        </Option>
      );
    });

  const reassignTask = useReassignTask(program, task.Id);

  return (
    <div className="startFieldContainer">
      <Label id={"PCOId"} weight="semibold" className="fieldLabel" required>
        <ContactIcon className="fieldIcon" />
        PCO
      </Label>

      <Dropdown
        id="PCOId"
        name="PCO"
        value={person.Title}
        onOptionSelect={(_e, data) => {
          const pco = pcos?.find(
            (user) => user.EMail === data.selectedOptions[0],
          );
          setPerson(pco || task.Person);
        }}
      >
        {pcoOptions()}
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
export default EditPCO;
