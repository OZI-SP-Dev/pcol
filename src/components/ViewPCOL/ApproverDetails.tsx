import { Button, Tooltip } from "@fluentui/react-components";
import { AcceptIcon, AlertSolidIcon } from "@fluentui/react-icons-mdl2";
import { useParams } from "react-router-dom";
import { usePCOL } from "src/api/PCOL/usePCOL";
import { Task, useTasks, useUpdateTask } from "src/api/tasks/tasksApi";

declare const _spPageContextInfo: { userId: number };

const ApproverButtons = ({ task }: { task: Task }) => {
  const { program, pcolId } = useParams();
  const updateTask = useUpdateTask(String(program), String(pcolId), task.Id);

  if (task.Person.Id === _spPageContextInfo.userId) {
    return (
      <div>
        <Tooltip content="Approve" relationship="label">
          <Button
            appearance="primary"
            icon={<AcceptIcon />}
            onClick={() => updateTask.mutate("Approved")}
          />
        </Tooltip>
        <Tooltip content="Reject" relationship="label">
          <Button
            style={{ color: "crimson" }}
            icon={<AlertSolidIcon />}
            onClick={() => () => updateTask.mutate("Rejected")}
          />
        </Tooltip>
      </div>
    );
  }
};

const ViewApproverDetails = () => {
  const { program, pcolId } = useParams();
  const pcol = usePCOL(String(program), Number(pcolId));
  const tasks = useTasks(String(program), String(pcolId));

  const parallel = tasks.data?.filter((task) => task.Role === "Parallel");
  const serial = tasks.data
    ?.filter((task) => task.Role === "Serial")
    .sort((a, b) => Number(a.Title) - Number(b.Title));
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
                <td>{task.Status ?? "Pending"}</td>
                <td>
                  {pcol.data?.Stage === "Peer Review" && (
                    <ApproverButtons task={task} />
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
                <td>{task.Status ?? "Pending"}</td>
                <td>
                  {pcol.data?.Stage === "Peer Review" &&
                    task.Id === currSerialTaskId && (
                      <ApproverButtons task={task} />
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
                  <td>{org.Status ?? "Pending"}</td>
                  <td>
                    {pcol.data?.Stage === "Organizational Review" && (
                      <ApproverButtons task={org} />
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
                <td>{pco?.Status ?? "Pending"}</td>
                <td>
                  {pcol.data?.Stage === "Approval" && (
                    <ApproverButtons task={pco} />
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
                <td>{distributor?.Status ?? "Pending"}</td>
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
