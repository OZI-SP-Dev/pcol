import ActionBar from "./ActionBar";
import StatusBar from "./StatusBar";
import ViewPCOLDetails from "./Details";
import ViewPCOLDocuments from "./Documents";
import ViewPCOLNotes from "./Notes";
import "./ViewPCOL.css";

const ViewPCOL = () => {
  return (
    <section id="viewPCOLContainer">
      <aside id="viewPCOLActionBar" className="gray-gradiant">
        <ActionBar openEditForm={() => {}} />
      </aside>
      <section id="viewPCOLHeader" className="gray-gradiant">
        <StatusBar />
      </section>
      <section id="viewPCOLDetailsContainer">
        <ViewPCOLDetails />
      </section>
      <section id="viewPCOLNotes">
        <ViewPCOLNotes />
      </section>
      <aside id="viewPCOLDocuments">
        <ViewPCOLDocuments />
      </aside>
    </section>
  );
};

export default ViewPCOL;
