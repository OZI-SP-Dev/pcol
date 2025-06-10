import { Title2, Title3 } from "@fluentui/react-components";
import { SPDocument, useDocuments } from "src/api/documentsApi";
import { useParams } from "react-router-dom";
import { DocumentView } from "src/components/ViewPCOL/Documents/DocumentView";
import { DocumentUploader } from "src/components/ViewPCOL/Documents/DocumentUploader";
import { usePCOL } from "src/api/PCOL/usePCOL";

const getDocuments = (docGroup: string, docData?: SPDocument[]) => {
  return docData?.map((document) => {
    return (
      document.ListItemAllFields.DocGroup === docGroup && (
        <DocumentView
          key={document.UniqueId}
          readonly={true}
          document={document}
        />
      )
    );
  });
};

const DispDocuments = (props: {
  docGroup: string;
  documents?: (false | JSX.Element)[];
  pcolTitle?: string;
}) => {
  return (
    <section
      style={{
        boxShadow: "0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)",
        borderRadius: "2em",
        padding: "1em",
        margin: "0.25em",
      }}
    >
      <Title3>{props.docGroup}</Title3>
      {props.documents}

      {props.pcolTitle && (
        <DocumentUploader
          pcolName={props.pcolTitle}
          docGroup={props.docGroup}
        />
      )}
    </section>
  );
};

const ViewRequestDocuments = () => {
  const { program, pcolId } = useParams();
  const pcol = usePCOL(String(program), Number(pcolId));
  const documents = useDocuments(String(program), String(pcol.data?.Title));

  const pcols = getDocuments("PCOL", documents.data);
  const attachments = getDocuments("Attachment", documents.data);
  const supportdocs = getDocuments("Support", documents.data);

  console.log(documents.data);

  return (
    <>
      <Title2>Documents</Title2>
      {(documents.isLoading || pcol.isLoading) && <div>Fetching data...</div>}
      <br />
      {documents.data && pcol.data && (
        <>
          <DispDocuments docGroup="PCOL" documents={pcols} />
          <DispDocuments
            docGroup="Attachment"
            documents={attachments}
            pcolTitle={pcol.data.Title}
          />
          <DispDocuments
            docGroup="Support"
            documents={supportdocs}
            pcolTitle={pcol.data.Title}
          />
        </>
      )}
      {documents.isError && (
        <div>An error has occured: {(documents.error as Error).message}</div>
      )}
    </>
  );
};

export default ViewRequestDocuments;
