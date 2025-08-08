import { Button, Tooltip } from "@fluentui/react-components";
import { EditIcon } from "@fluentui/react-icons-mdl2";

const EditRequest = ({ openEditForm }: { openEditForm: () => void }) => {
  const disabled = true;
  return (
    <Tooltip withArrow content="Edit" relationship="label">
      <Button
        style={{
          border: "none",
          background: "transparent",
          borderRadius: "50%",
        }}
        disabled={true}
        icon={<EditIcon className={disabled ? "" : "blue"} />}
        size="large"
        onClick={openEditForm}
      />
    </Tooltip>
  );
};

export default EditRequest;
