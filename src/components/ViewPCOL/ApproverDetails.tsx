import { Tooltip } from "@fluentui/react-components";
import usePCOLParams from "../pcolParams";
import { usePCOL } from "src/api/PCOL/usePCOL";
import { Task, useTasks } from "src/api/tasks/tasksApi";
import ApproveButton from "./ApproveButton";
import RejectButton from "./RejectButton";
import SkipButton from "./SkipButton";
import { useMyRoles } from "src/api/Roles/rolesApi";

const ApproverButtons = ({
  task,
  pco,
  isAdmin,
}: {
  task: Task;
  pco?: { Id: number; Title: string; EMail: string };
  isAdmin?: boolean;
}) => {
  const isPCO = pco?.Id === _spPageContextInfo.userId;
  const canSkip =
    !task.Status &&
    task.Person.Id !== pco?.Id && // PCO can't skip their own task
    (isPCO || isAdmin);

  return (
    <div>
      {!task.Status && task.Person.Id === _spPageContextInfo.userId && (
        <ApproveButton task={task} />
      )}

      {canSkip && <SkipButton task={task} />}

      {!task.Status && isPCO && <RejectButton task={task} />}
    </div>
  );
};

const Status = ({ task, stage }: { task: Task; stage?: string }) => {
  if (task.Status) {
    return (
      <Tooltip
        content={
          <>
            {task.SkippedBy ? (
              <>
                Skipped by: {task.SkippedBy.Title}
                <br />
              </>
            ) : (
              <></>
            )}
            On:{" "}
            {task.Modified ? new Date(task.Modified).toLocaleDateString() : ""}
          </>
        }
        relationship="description"
      >
        <span>{task.Status}</span>
      </Tooltip>
    );
  }
  return stage !== "Rejected" && stage !== "Cancelled" ? <>Pending</> : <></>;
};

const ViewApproverDetails = () => {
  const { program, pcolId } = usePCOLParams();
  const roles = useMyRoles(program);
  const pcol = usePCOL(program, pcolId);
  const tasks = useTasks(program, pcolId);

  const parallel = tasks.data?.filter((task) => task.Role === "Parallel");
  const serial = tasks.data
    ?.filter((task) => task.Role === "Serial")
    .sort((a, b) => Number(a.Title) - Number(b.Title));
  const final = tasks.data?.find((task) => task.Role === "Final");
  const org = tasks.data?.find((task) => task.Role === "Org");
  const pco = tasks.data?.find((task) => task.Role === "PCO");
  const distributor = tasks.data?.find((task) => task.Role === "Distributor");

  let currSerialTaskId = 0;
  if (pcol.data?.Stage === "Peer Review") {
    const prParallel = parallel?.find((task) => !task.Status);
    if (!prParallel) {
      currSerialTaskId = serial?.find((task) => !task.Status)?.Id ?? 0;
    }
  }

  return (
    <>
      {tasks.isLoading && <div>Fetching data...</div>}
      {tasks.data && (
        <table style={{ marginBottom: "0.5em" }}>
          <tbody>
            <tr>
              <th scope="rowgroup" colSpan={3}>
                Parallel Reviewers
              </th>
            </tr>
            {parallel?.map((task) => (
              <tr key={task.Id}>
                <td>{task.Person.Title}</td>
                <td>
                  <Status task={task} stage={pcol.data?.Stage} />
                </td>
                <td>
                  {pcol.data?.Stage === "Peer Review" && (
                    <ApproverButtons
                      task={task}
                      pco={pco?.Person}
                      isAdmin={roles.isAdmin}
                    />
                  )}
                </td>
              </tr>
            ))}
            {(!parallel || parallel.length === 0) && (
              <tr>
                <td colSpan={3}>No Parallel Reviewers Assigned</td>
              </tr>
            )}
          </tbody>

          <tbody>
            <tr>
              <th scope="rowgroup" colSpan={3}>
                Serial Reviewers
              </th>
            </tr>
            {serial?.map((task) => (
              <tr key={task.Id}>
                <td>{task.Person.Title}</td>
                <td>
                  <Status task={task} stage={pcol.data?.Stage} />
                </td>
                <td>
                  {pcol.data?.Stage === "Peer Review" &&
                    task.Id === currSerialTaskId && (
                      <ApproverButtons
                        task={task}
                        pco={pco?.Person}
                        isAdmin={roles.isAdmin}
                      />
                    )}
                </td>
              </tr>
            ))}
            {(!serial || serial.length === 0) && (
              <tr>
                <td colSpan={3}>No Serial Reviewers Assigned</td>
              </tr>
            )}
          </tbody>

          {final && (
            <tbody>
              <tr>
                <th scope="rowgroup" colSpan={3}>
                  Final Reviewer
                </th>
              </tr>
              <tr>
                <td>{final.Person.Title}</td>
                <td>
                  <Status task={final} stage={pcol.data?.Stage} />
                </td>
                <td>
                  {pcol.data?.Stage === "Final Review" && (
                    <ApproverButtons
                      task={final}
                      pco={pco?.Person}
                      isAdmin={roles.isAdmin}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          )}

          <tbody>
            <tr>
              <th scope="rowgroup" colSpan={3}>
                Org Reviewer
              </th>
            </tr>
            <tr>
              {org && (
                <>
                  <td>{org.Person.Title}</td>
                  <td>
                    <Status task={org} stage={pcol.data?.Stage} />
                  </td>
                  <td>
                    {pcol.data?.Stage === "Organizational Review" && (
                      <ApproverButtons
                        task={org}
                        pco={pco?.Person}
                        isAdmin={roles.isAdmin}
                      />
                    )}
                  </td>
                </>
              )}
              {!org && <td colSpan={3}>No Org Reviewer Assigned</td>}
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th scope="rowgroup" colSpan={3}>
                PCO
              </th>
            </tr>
            {pco && (
              <tr>
                <td>{pco?.Person.Title}</td>
                <td>
                  <Status task={pco} stage={pcol.data?.Stage} />
                </td>
                <td>
                  {pcol.data?.Stage === "Approval" && (
                    <ApproverButtons
                      task={pco}
                      pco={pco?.Person}
                      isAdmin={roles.isAdmin}
                    />
                  )}
                </td>
              </tr>
            )}
          </tbody>

          <tbody>
            <tr>
              <th scope="rowgroup" colSpan={3}>
                Distributor
              </th>
            </tr>
            {distributor && (
              <tr>
                <td>{distributor?.Person.Title}</td>
                <td>
                  <Status task={distributor} stage={pcol.data?.Stage} />
                </td>
                <td>
                  {pcol.data?.Stage === "Distribution" && (
                    <ApproverButtons task={distributor} />
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {tasks.isError && (
        <div>An error has occured: {(tasks.error as Error).message}</div>
      )}
    </>
  );
};

export default ViewApproverDetails;
