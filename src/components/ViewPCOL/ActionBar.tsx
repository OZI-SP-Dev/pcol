import SendRequest from "./Actions/SendRequest";
import ResetRequest from "./Actions/ResetRequest";
import EditRequest from "./Actions/EditRequest";
import CancelRequest from "./Actions/CancelRequest";

const ActionBar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SendRequest />
      <ResetRequest />
      <EditRequest />
      <CancelRequest />
    </div>
  );
};

export default ActionBar;
