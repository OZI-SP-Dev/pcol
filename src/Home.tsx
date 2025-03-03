import { Body1, Title1, Title3, makeStyles } from "@fluentui/react-components";
import { Link, useParams } from "react-router";

const useStyles = makeStyles({
  section: {
    marginTop: "12px",
    marginBottom: "12px",
    marginLeft: "12px",
    marginRight: "12px",
    maxWidth: "50em",
    minWidth: "600px",
    width: "100%",
  },
});

const Home = () => {
  const styles = useStyles();
  const { program } = useParams();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Title1 align="center" style={{ whiteSpace: "nowrap" }}>
        <b>Welcome to the AFLCMC PCOL Tool</b>
      </Title1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          flexWrap: "wrap",
          flexGrow: 1,
          flexBasis: "auto",
        }}
      >
        <section className={styles.section}>
          <Title3 align="center">PCO Authority</Title3>
          <Body1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              porta est in ligula accumsan mollis in scelerisque nisl. Nunc
              lacinia elit quis ligula fringilla pellentesque. Proin vitae sem
              egestas, maximus orci id, congue felis. Fusce sem justo, tempor a
              porttitor aliquam, egestas sed enim. Aliquam egestas mauris vitae
              odio hendrerit, nec finibus felis tristique. Aenean ac mauris
              euismod, suscipit sapien non, tempus metus. Aliquam maximus
              commodo est, aliquam bibendum enim finibus eget. Cras lobortis
              urna quis ante luctus vulputate. Pellentesque laoreet ligula
              tellus, vulputate dignissim magna vehicula id. Proin laoreet orci
              in justo aliquam laoreet at pellentesque nulla. Proin egestas
              euismod pharetra.
            </p>
          </Body1>
        </section>
        <section className={styles.section}>
          <Title3 align="center">PCOL Tool Instructions</Title3>
          <Body1>
            <p>
              Select <Link to="/New">“New PCOL"</Link> at the top of this page
              to initiate a PCOL. Complete the following pages and click "Save
              and Continue" to continue through the process. All fields with an
              asterisk must be completed before continuing to the next page.
              After saving, you can return to your request later by clicking its
              Position Title on the home page / in the table below.
            </p>
            <p>
              Once complete, select the{" "}
              <Link to={"/p/" + program}>{program} Home</Link> link at the top
              left of the page to return to the Dashboard. Here, you can view
              all PCOLs you've entered and the current stage of the process each
              one is in.
            </p>
          </Body1>
        </section>
      </div>
      <div>DASHBOARD PLACEHOLDER</div>
    </div>
  );
};

export default Home;
