import { usePCOL } from "src/api/PCOL/usePCOL";
import { useParams } from "react-router-dom";
import { Title2, Title3 } from "@fluentui/react-components";

const STAGES = [
  "Draft",
  "Peer Review",
  "Final Review",
  "Organizational Review",
  "Approval",
  "Distribution",
  "Distributed",
];

const StatusBar = () => {
  const { program, pcolId } = useParams();
  const pcol = usePCOL(String(program), Number(pcolId));

  const stageIndex = STAGES.indexOf(pcol.data?.Stage || "");

  return (
    <>
      {pcol.data && <Title2>{pcol.data.Title}</Title2>}
      <br />
      <Title3>Current Stage: {pcol.data?.Stage || "Unknown"}</Title3>
      <ul className="request-status">
        {STAGES.map((stage, index) => (
          <>
            <li
              key={stage}
              className={
                (index < stageIndex ? "completed-stage" : "") ||
                (index === stageIndex ? "active-stage" : "") ||
                (index > stageIndex ? "inactive-stage" : "")
              }
            >
              <div>{stage}</div>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default StatusBar;
