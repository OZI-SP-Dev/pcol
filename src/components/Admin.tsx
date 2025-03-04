import { Title2, Title3 } from "@fluentui/react-components";
import { useParams } from "react-router";
import { useCurrentUserHasEditPermissions } from "src/api/permissionsApi";

const Admin = () => {
  const { program } = useParams();

  const mainPerms = useCurrentUserHasEditPermissions();
  const programPerms = useCurrentUserHasEditPermissions(program);

  const isAdmin = mainPerms.data || programPerms.data;

  return (
    <>
      <Title2>PCOL Admin Page</Title2>
      <br />
      This is a placeholder for a PCOL Admin page.
      <br />
      {!isAdmin && <>You are not an admin!</>}
      {mainPerms.data && (
        <>
          <Title3>PK Office Items</Title3>
          <ul>
            <li>Letter Template</li>
            <li>Disclaimer Statements (Global)</li>
            <li>Department of Defense Activity Address Directory (DoDAAD)</li>
          </ul>
        </>
      )}
      {program && programPerms.data && (
        <>
          <Title3>PK Office Items</Title3>
          <ul>
            <li>Contractors</li>
            <li>Contracts</li>
            <li>Disclaimer Statements (Program Unique)</li>
          </ul>
        </>
      )}
    </>
  );
};

export default Admin;
