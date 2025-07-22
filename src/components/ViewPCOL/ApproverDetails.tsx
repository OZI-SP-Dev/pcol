import { useParams } from "react-router-dom";
import { useTasks } from "src/api/tasks/tasksApi";

const ViewApproverDetails = () => {
  const { program, pcolId } = useParams();
  const tasks = useTasks(String(program), String(pcolId));

  const parallel = tasks.data?.filter((task) => task.Role === "Parallel");
  const serial = tasks.data
    ?.filter((task) => task.Role === "Serial")
    .sort((a, b) => Number(a.Title) - Number(b.Title));
  const org = tasks.data?.find((task) => task.Role === "Org");
  const pco = tasks.data?.find((task) => task.Role === "PCO");
  const distributor = tasks.data?.find((task) => task.Role === "Distributor");

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
                <td></td>
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
                <td></td>
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
                  <td></td>
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
            <tr>
              <td>{pco?.Person.Title}</td>
              <td>{pco?.Status ?? "Pending"}</td>
              <td></td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th scope="rowgroup" colSpan={3}>
                Distributor
              </th>
            </tr>
            <tr>
              <td>{distributor?.Person.Title}</td>
              <td>{distributor?.Status ?? "Pending"}</td>
              <td></td>
            </tr>
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
