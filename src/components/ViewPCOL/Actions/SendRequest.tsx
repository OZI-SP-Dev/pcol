import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Tooltip,
} from "@fluentui/react-components";
import { NavigateForwardIcon } from "@fluentui/react-icons-mdl2";
// import { useNavigate, useParams } from "react-router-dom";

const SendRequest = () => {
  // const params = useParams();
  // const pcolId = Number(params.pcolId);
  // const navigate = useNavigate();

  const disableSend = true;

  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <Tooltip withArrow content="Send" relationship="label">
          <Button
            style={{
              border: "none",
              background: "transparent",
              borderRadius: "50%",
            }}
            icon={<NavigateForwardIcon className="orange" />}
            size="large"
            disabled={disableSend}
          />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Send request</DialogTitle>
          <DialogContent>CONTENT</DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                // onClick={() => updateHandler()}
                // disabled={!readyForNextStage}
              >
                Send
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default SendRequest;
