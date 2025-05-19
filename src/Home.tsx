import { Body1, Title1, Title3, makeStyles } from "@fluentui/react-components";
import PCOLsTable from "src/components/PCOLsTable/PCOLsTable";

const useStyles = makeStyles({
  section: {
    marginTop: "12px",
    marginBottom: "12px",
    marginLeft: "12px",
    marginRight: "12px",
    maxWidth: "80%",
    minWidth: "600px",
    width: "100%",
  },
});

const Home = () => {
  const styles = useStyles();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Title1 align="center" style={{ textWrap: "balance" }}>
        <b>
          Welcome to the AFLCMC Procuring Contracting Officer Letter (PCOL)
          Writing Tool
        </b>
      </Title1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          flexGrow: 1,
          flexBasis: "auto",
        }}
      >
        <section className={styles.section}>
          <Body1>
            <p>
              The purpose of this tool is to streamline and standardize the
              creation of PCOLs in accordance with the Federal Acquisition
              Regulation (FAR), Defense Federal Acquisition Regulation
              Supplement (DFARS), and Air Force Federal Acquisition Regulation
              Supplement (DAFFARS). By providing an intuitive interface, this
              tool ensures that PCOLs are generated efficiently, accurately, and
              in full compliance with applicable procurement laws and
              regulations. Its purpose is to enhance the effectiveness of Air
              Force contracting officers in managing procurement processes,
              ensuring clarity, consistency, and accountability in all official
              communications.
            </p>
          </Body1>
          <Title3
            align="center"
            style={{ display: "inline-block", textWrap: "balance" }}
          >
            United States Air Force Procuring Contracting Officer Letter
            Authority Statement
          </Title3>
          <Body1>
            <ol>
              <li style={{ fontWeight: "bold" }}>
                Authority and Delegation of Procurement Authority
                <p style={{ fontWeight: "normal" }}>
                  The authority to issue Procuring Contracting Officer Letters
                  (PCOLs), which includes the authorization to make binding
                  procurement decisions, is granted under the provisions of the
                  Federal Acquisition Regulation (FAR), the Defense Federal
                  Acquisition Regulation Supplement (DFARS), and the Air Force
                  Federal Acquisition Regulation Supplement (DAFFARS). In
                  accordance with these regulations, the Procuring Contracting
                  Officer holds the necessary legal and operational authority to
                  issue PCOLs within the scope of their delegated
                  responsibilities. In the case of any specific procurement
                  action, a PCOL may be issued to confirm the contracting
                  officer’s intent, establish contract terms, provide guidance
                  for contract execution, or otherwise address matters relating
                  to the procurement process.
                </p>
              </li>
            </ol>
          </Body1>
        </section>
      </div>
      <PCOLsTable />
    </div>
  );
};

export default Home;
