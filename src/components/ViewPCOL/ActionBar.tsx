import SendRequest from "./Actions/SendRequest";
import ResetRequest from "./Actions/ReworkRequest";
import EditRequest from "./Actions/EditRequest";
import CancelRequest from "./Actions/CancelRequest";

const ActionBar = ({ openEditForm }: { openEditForm: () => void }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SendRequest />
      <ResetRequest />
      <EditRequest openEditForm={openEditForm} />
      <CancelRequest />
    </div>
  );
};

export default ActionBar;
