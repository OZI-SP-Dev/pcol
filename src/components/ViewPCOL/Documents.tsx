import { Title2 } from "@fluentui/react-components";
import { useDocuments } from "src/api/documentsApi";
import { useParams } from "react-router-dom";
import { DocumentView } from "src/components/ViewPCOL/Documents/DocumentView";
import { DocumentUploader } from "src/components/ViewPCOL/Documents/DocumentUploader";

const ViewRequestDocuments = () => {
  const params = useParams();
  const pcolId = Number(params.pcolId);
  // const program = String(params.program);
  // const pcol = usePCOL(program, pcolId);

  const documents = useDocuments(pcolId);

  return (
    <>
      <Title2>Documents</Title2>
      <DocumentUploader pcolId={pcolId} />
      {documents.isLoading && <div>Fetching data...</div>}
      <br />
      {documents.data && (
        <section>
          {documents.data.map((document) => {
            return (
              <DocumentView
                key={document.UniqueId}
                readonly={false}
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
