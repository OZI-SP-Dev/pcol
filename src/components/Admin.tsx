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

  const globalList = _spPageContextInfo.webAbsoluteUrl + "/Lists/";
  const programList =
    _spPageContextInfo.webAbsoluteUrl + "/" + program + "/Lists/";

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
                onClick={() => seturl(globalList + "Disclaimers/AllItems.aspx")}
              >
                Disclaimer Statements (Global)
              </Button>
            </li>
            <li>
              <Button
                appearance="transparent"
                onClick={() => seturl(globalList + "DODAAC/AllItems.aspx")}
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
            <li>
              <Button
                appearance="transparent"
                onClick={() =>
                  seturl(programList + "Contractors/AllItems.aspx")
                }
              >
                Contractors
              </Button>
            </li>
            <li>
              <Button
                appearance="transparent"
                onClick={() => seturl(programList + "Contracts/AllItems.aspx")}
              >
                Contracts
              </Button>
            </li>
            <li>
              <Button
                appearance="transparent"
                onClick={() =>
                  seturl(programList + "ContractorPOCs/AllItems.aspx")
                }
              >
                Contractor POCs
              </Button>
            </li>
            <li>
              <Button
                appearance="transparent"
                onClick={() =>
                  seturl(programList + "Disclaimers/AllItems.aspx")
                }
              >
                Disclaimer Statements (Program Unique)
              </Button>
            </li>
            <li>
              <Button
                appearance="transparent"
                onClick={() => seturl(programList + "DODAAC/AllItems.aspx")}
              >
                Default DODAAC
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
          style={{ height: "100vh", width: "100vw" }}
          src={url}
        ></iframe>
      )}
    </>
  );
};

export default Admin;
