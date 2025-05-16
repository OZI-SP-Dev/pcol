import { usePCOL } from "src/api/PCOL/usePCOL";
import { useParams } from "react-router-dom";
// import { STAGES } from "src/consts/Stages";
import { Title2, Title3 } from "@fluentui/react-components";

// TODO: REPLACE WITH PROPER STAGES FILE
const STAGES = ["READY", "SET", "GO"];

const StatusBar = () => {
  const { program, pcolId } = useParams();
  const pcol = usePCOL(String(program), Number(pcolId));

  const stageIndex = 0; //STAGES.findIndex(({ key }) => key === pcol.data?.stage);
  // const currentStage =
  //   STAGES[stageIndex]?.text || pcol.data?.stage || "Loading...";
  // const subStageIndex = STAGES[stageIndex]?.subStages?.findIndex(
  //   ({ key }) => key === pcol.data?.subStage
  // );

  return (
    <>
      {pcol.data && <Title2>{pcol.data.Title}</Title2>}
      <br />
      <Title3>Current Stage: TBD</Title3>
      <ul className="request-status">
        {STAGES.map((stage, index) => (
          <>
            <li
              key={stage /*.key*/}
              className={
                (index < stageIndex ? "completed-stage" : "") ||
                (index === stageIndex ? "active-stage" : "") ||
                (index > stageIndex ? "inactive-stage" : "")
              }
            >
              <div>{stage /*.text*/}</div>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default StatusBar;
