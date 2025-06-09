import { Title2 } from "@fluentui/react-components";
import { useDocuments } from "src/api/documentsApi";
import { useParams } from "react-router-dom";
import { DocumentView } from "src/components/ViewPCOL/Documents/DocumentView";
import { DocumentUploader } from "src/components/ViewPCOL/Documents/DocumentUploader";
import { usePCOL } from "src/api/PCOL/usePCOL";

const ViewRequestDocuments = () => {
  const { program, pcolId } = useParams();
  const pcol = usePCOL(String(program), Number(pcolId));
  const documents = useDocuments(String(program), String(pcol.data?.Title));

  return (
    <>
      <Title2>Documents</Title2>
      {pcol.data && <DocumentUploader pcolName={pcol.data.Title} />}
      {(documents.isLoading || pcol.isLoading) && <div>Fetching data...</div>}
      <br />
      {documents.data && (
        <section>
          {documents.data.map((document) => {
            return (
              <DocumentView
                key={document.UniqueId}
                readonly={true}
                document={document}
              />
            );
          })}
        </section>
      )}
      {documents.isError && (
        <div>An error has occured: {(documents.error as Error).message}</div>
      )}
    </>
  );
};

export default ViewRequestDocuments;
