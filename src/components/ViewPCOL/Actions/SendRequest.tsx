import {
  Button,
  Dialog,
  DialogSurface,
  DialogTrigger,
  Tooltip,
} from "@fluentui/react-components";
import { usePCOL } from "src/api/PCOL/usePCOL";
import { useParams } from "react-router-dom";
import { NavigateForwardIcon } from "@fluentui/react-icons-mdl2";
import { useMyRoles } from "src/api/Roles/rolesApi";
import StartWorkflow from "./StartForm/StartWorkflow";

declare const _spPageContextInfo: { userId: number };

const SendRequest = () => {
  const { program, pcolId } = useParams();
  const pcol = usePCOL(String(program), Number(pcolId));
  const roles = useMyRoles(program);
  const isAuthor = pcol.data?.Author.Id === _spPageContextInfo.userId;

  let disableSend = true;

  if (pcol.data?.Stage === "Draft" && (isAuthor || roles.isAdmin)) {
    disableSend = false;
  }

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
        {pcol.data?.Stage === "Draft" && (isAuthor || roles.isAdmin) && (
          <StartWorkflow />
        )}
      </DialogSurface>
    </Dialog>
  );
};

export default SendRequest;
