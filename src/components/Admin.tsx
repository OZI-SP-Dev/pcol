import { Button, Title2, Title3 } from "@fluentui/react-components";
import { useState } from "react";
import { useParams } from "react-router";
import { useCurrentUserHasEditPermissions } from "src/api/permissionsApi";

declare const _spPageContextInfo: { webAbsoluteUrl: string };

const Admin = () => {
  const { program } = useParams();
  const mainPerms = useCurrentUserHasEditPermissions();
  const programPerms = useCurrentUserHasEditPermissions(program);
  const isAdmin = mainPerms.data || programPerms.data;
  const [url, seturl] = useState("");

  return (
    <>
      <Title2>PCOL Admin Page</Title2>
      <br />
      <br />
      {!isAdmin && <>You are not an admin!</>}
      {mainPerms.data && (
        <>
          <Title3>PK Office Items</Title3>
          <ul>
            <li>Letter Template</li>
            <li>
              <Button
                appearance="transparent"
                onClick={() =>
                  seturl(
                    _spPageContextInfo.webAbsoluteUrl +
                      "/Lists/Disclaimers/AllItems.aspx"
                  )
                }
              >
                Disclaimer Statements (Global)
              </Button>
            </li>
            <li>
              <Button
                appearance="transparent"
                onClick={() =>
                  seturl(
                    _spPageContextInfo.webAbsoluteUrl +
                      "/Lists/DODAAC/AllItems.aspx"
                  )
                }
              >
                DODAACs
              </Button>
            </li>
          </ul>
        </>
      )}
      {program && programPerms.data && (
        <>
          <Title3>{program} Program Office Items</Title3>
          <ul>
            <li>Contractors</li>
            <li>Contracts</li>
            <li>
              <Button
                appearance="transparent"
                onClick={() =>
                  seturl(
                    _spPageContextInfo.webAbsoluteUrl +
                      "/" +
                      program +
                      "/Lists/Disclaimers/AllItems.aspx"
                  )
                }
              >
                Disclaimer Statements (Program Unique)
              </Button>
            </li>
            <li>
              <Button
                appearance="transparent"
                onClick={() =>
                  seturl(
                    _spPageContextInfo.webAbsoluteUrl +
                      "/" +
                      program +
                      "/Lists/DODAAC/AllItems.aspx"
                  )
                }
              >
                Program's DODAACs
              </Button>
            </li>
          </ul>
        </>
      )}
      <br />
      <br />
      {url && (
        <iframe
          title="Edit Items iFrame"
          width="100%"
          height="500"
          src={url}
        ></iframe>
      )}
    </>
  );
};

export default Admin;
