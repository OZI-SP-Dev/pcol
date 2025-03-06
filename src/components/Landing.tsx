import { Title2, Title3 } from "@fluentui/react-components";
import { Link } from "react-router";
import { useWebs } from "src/api/webApi";

const Landing = () => {
  const webs = useWebs();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <br />
      <Title2>Welcome to the PCOL Tool</Title2>
      <br />
      <br />
      {webs.isLoading && <div>Fetching data...</div>}
      {webs.isError && (
        <div>
          There was an error! Reload to try again, or view the{" "}
          <Link to="/help">Help</Link> page.
        </div>
      )}
      {webs.data && webs.data.length > 0 && (
        <>
          <section>
            <Title3>Please click the org link for your PCOLs</Title3>
            <ul>
              {webs.data.map((web) => (
                <li key={web.Title}>
                  <Link to={"/p/" + web.Title}>{web.Title}</Link>
                </li>
              ))}
            </ul>
          </section>
          <br />
          <section>
            Program not listed? See the <Link to="/help">Help</Link> page.
          </section>
        </>
      )}
      {webs.data && webs.data.length === 0 && (
        <>
          You do not have access to any PCOL Orgs. See the{" "}
          <Link to="/help">Help</Link> page.
        </>
      )}
    </div>
  );
};

export default Landing;
