import {
  Button,
  InfoLabel,
  Link,
  Title2,
  Title3,
  Toast,
  ToastBody,
  ToastTitle,
  ToastTrigger,
  Tooltip,
  useToastController,
} from "@fluentui/react-components";
import { SPDocument, useDocuments } from "src/api/documentsApi";
import usePCOLParams from "../pcolParams";
import { DocumentView } from "src/components/ViewPCOL/Documents/DocumentView";
import { DocumentUploader } from "src/components/ViewPCOL/Documents/DocumentUploader";
import { usePCOL } from "src/api/PCOL/usePCOL";
import { CopyIcon } from "@fluentui/react-icons-mdl2";

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
  labelInfo: string;
  attachmentsList?: string[];
}) => {
  const { dispatchToast } = useToastController("toaster");
  return (
    <section
      style={{
        boxShadow: "0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)",
        borderRadius: "2em",
        padding: "1em",
        margin: "0.25em",
      }}
    >
      <InfoLabel weight="semibold" info={props.labelInfo} size="large">
        <Title3>{props.docGroup}</Title3>
      </InfoLabel>

      {props.docGroup === "Attachment" && (
        <Tooltip
          relationship="description"
          content="Copy Attachment file names"
        >
          <Button
            aria-label="Copy Attachment file names"
            appearance="transparent"
            style={{ float: "inline-end" }}
            icon={<CopyIcon />}
            onClick={async () => {
              let attString = "";
              if (props.attachmentsList) {
                for (const attName of props.attachmentsList) {
                  attString += attName + "\n";
                }
              }
              try {
                await navigator.clipboard.writeText(attString);
                dispatchToast(
                  <Toast>
                    <ToastTitle>
                      Copied list of Attachment file names
                    </ToastTitle>
                  </Toast>,
                  { intent: "success" }
                );
              } catch (error) {
                console.log(error);
                if (error instanceof Error) {
                  dispatchToast(
                    <Toast>
                      <ToastTitle
                        action={
                          <ToastTrigger>
                            <Link>Dismiss</Link>
                          </ToastTrigger>
                        }
                      >
                        Error copying Attachment file names
                      </ToastTitle>
                      <ToastBody>
                        <p>File names:</p>
                        <p>
                          {props.attachmentsList?.map((fileName) => (
                            <>
                              {fileName}
                              <br />
                            </>
                          ))}
                        </p>
                        <br />
                        <p>
                          Error message:
                          <br />
                          {error.message}
                        </p>
                      </ToastBody>
                    </Toast>,
                    { intent: "error", timeout: -1 }
                  );
                }
              }
            }}
          />
        </Tooltip>
      )}

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
  const { program, pcolId } = usePCOLParams();
  const pcol = usePCOL(program, pcolId);
  const documents = useDocuments(program, String(pcol.data?.Title));

  const pcols = getDocuments("PCOL", documents.data);
  const attachments = getDocuments("Attachment", documents.data);
  const supportdocs = getDocuments("Support", documents.data);
  const attachmentsList = [] as string[];

  if (documents.data) {
    for (const document of documents.data) {
      if (document.ListItemAllFields.DocGroup === "Attachment") {
        attachmentsList.push(document.Name);
      }
    }
  }

  return (
    <>
      <Title2>Documents</Title2>
      {(documents.isLoading || pcol.isLoading) && <div>Fetching data...</div>}
      <br />
      {documents.data && pcol.data && (
        <>
          <DispDocuments
            docGroup="PCOL"
            documents={pcols}
            labelInfo="PCO Letter"
          />
          <DispDocuments
            docGroup="Attachment"
            documents={attachments}
            attachmentsList={attachmentsList}
            pcolTitle={pcol.data.Title}
            labelInfo="Attachments are intended for distribution with the PCO Letter."
          />
          <DispDocuments
            docGroup="Support"
            documents={supportdocs}
            pcolTitle={pcol.data.Title}
            labelInfo="Supporting documents are not intended for distribution and are for internal use only."
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
