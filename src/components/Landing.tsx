import { Title2, Title3 } from "@fluentui/react-components";
import { Link } from "react-router";
import { useWebs } from "src/api/webApi";

const Landing = () => {
  const webs = useWebs();

  return (
    <>
      <Title2>Welcome to the PCOL Tool</Title2>
      <br />
      {webs.isLoading && <div>Fetching data...</div>}
      {webs.data && webs.data.length > 0 && (
        <>
          <section>
            <Title3>Please select the org for your PCOLs</Title3>
            {webs.data.map((web) => (
              <div key={web.Title}>
                <Link to={"/p/" + web.Title}>{web.Title}</Link>
              </div>
            ))}
          </section>
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
    </>
  );
};

export default Landing;
