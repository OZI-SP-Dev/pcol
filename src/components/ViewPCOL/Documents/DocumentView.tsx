import { Icon } from "@fluentui/react";
import {
  Button,
  Caption1,
  Card,
  CardHeader,
  Combobox,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Link,
  Option,
  Spinner,
  Title3,
  Tooltip,
} from "@fluentui/react-components";
import { getFileTypeIconProps } from "@fluentui/react-file-type-icons";
import { DeleteIcon, EditIcon } from "@fluentui/react-icons-mdl2";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  SPDocument,
  useDeleteDocument,
  useEditDocument,
} from "src/api/documentsApi";

declare const _spPageContextInfo: {
  webAbsoluteUrl: string;
  aadUserId: string;
  userEmail: string;
  siteId: string;
};

function getFileNameNoExt(str: string) {
  const lastPeriodIndex = str.lastIndexOf(".");
  if (lastPeriodIndex === -1) {
    return str; // Return the original string if no period is found
  }
  return str.substring(0, lastPeriodIndex);
}

function getFileNameExt(str: string) {
  const lastPeriodIndex = str.lastIndexOf(".");
  return str.substring(lastPeriodIndex + 1);
}

export const DocumentView = (props: {
  document: SPDocument;
  readonly?: boolean;
}) => {
  const params = useParams();
  const program = String(params.program);
  const deleteDocument = useDeleteDocument(program);
  const editDocument = useEditDocument(program);
  const fileExt = getFileNameExt(props.document.Name);
  const [filename, setFilename] = useState<string>(
    getFileNameNoExt(props.document.Name)
  );
  const [docGroup, setDocGroup] = useState<string[]>([
    props.document.ListItemAllFields.DocGroup,
  ]);

  const extension = props.document.ServerRelativeUrl.substring(
    props.document.ServerRelativeUrl.lastIndexOf(".") + 1
  );

  const lastModified = new Date(
    props.document.TimeLastModified
  ).toLocaleString();

  const isOfficeOrPdfFile: boolean = wordExtensions
    .concat(excelExtensions)
    .concat(ppExtensions)
    .concat(["pdf"])
    .includes(extension);

  const viewEdit = props.readonly ? "v" : "e";

  //Application specific URI schemes
  let downloadUrl = props.document.ServerRelativeUrl;
  if (wordExtensions.includes(extension)) {
    downloadUrl = `ms-word:of${viewEdit}|u|${window.location.origin}${props.document.ServerRelativeUrl}`;
  } else if (excelExtensions.includes(extension)) {
    downloadUrl = `ms-excel:of${viewEdit}|u|${window.location.origin}${props.document.ServerRelativeUrl}`;
  } else if (ppExtensions.includes(extension)) {
    downloadUrl = `ms-powerpoint:of${viewEdit}|u|${window.location.origin}${props.document.ServerRelativeUrl}`;
  } else if (extension === "pdf") {
    downloadUrl = "odopen://openFile/";
    downloadUrl += "?fileId=" + props.document.UniqueId;
    downloadUrl += "&siteId=" + _spPageContextInfo.siteId;
    downloadUrl += "&listId=" + props.document.ListId;
    downloadUrl += "&userEmail=" + _spPageContextInfo.userEmail;
    downloadUrl += "&userId=" + _spPageContextInfo.aadUserId;
    downloadUrl += "&webUrl=" + _spPageContextInfo.webAbsoluteUrl;
    downloadUrl += "&fileName=" + props.document.Name;
  }

  return (
    <Card style={{ margin: "0.5em" }}>
      <CardHeader
        image={
          <Icon
            {...getFileTypeIconProps({
              extension: extension,
              size: 64,
              imageFileType: "png",
            })}
          />
        }
        header={
          <Link download={!isOfficeOrPdfFile} href={encodeURI(downloadUrl)}>
            <Title3 className="document-name">{props.document.Name}</Title3>
          </Link>
        }
        description={
          <Caption1>
            Last Updated By: {props.document.ModifiedBy.Title}
            <br />
            Last Updated On: {lastModified}
          </Caption1>
        }
        action={
          <>
            {props.document.ListItemAllFields.DocGroup !== "PCOL" && (
              <>
                <Dialog modalType="alert">
                  <DialogTrigger disableButtonEnhancement>
                    <Tooltip
                      withArrow
                      content="Edit metadata"
                      relationship="label"
                    >
                      <Button
                        appearance="transparent"
                        icon={
                          editDocument.isPending ? <Spinner /> : <EditIcon />
                        }
                        aria-label="Delete"
                        disabled={editDocument.isPending}
                      />
                    </Tooltip>
                  </DialogTrigger>
                  <DialogSurface>
                    <DialogBody>
                      <DialogTitle>Edit document metadata</DialogTitle>
                      <DialogContent>
                        <form
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <Label htmlFor="FileName">File Name</Label>
                          <Input
                            id="FileName"
                            contentAfter={"." + fileExt}
                            value={filename}
                            onChange={(_ev, data) => setFilename(data.value)}
                          />
                          <Label htmlFor="DocGroup">Document Group</Label>
                          <Combobox
                            value={docGroup[0]}
                            selectedOptions={docGroup}
                            onOptionSelect={(_ev, data) => {
                              setDocGroup(data.selectedOptions);
                            }}
                          >
                            <Option>Attachment</Option>
                            <Option>Support</Option>
                          </Combobox>
                        </form>
                      </DialogContent>
                      <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                          <Button appearance="secondary">Cancel</Button>
                        </DialogTrigger>
                        <DialogTrigger disableButtonEnhancement>
                          <Button
                            appearance="primary"
                            disabled={filename.length === 0}
                            onClick={() =>
                              editDocument.mutate({
                                document: props.document,
                                metadata: {
                                  Name: filename + "." + fileExt,
                                  DocGroup: docGroup[0],
                                },
                              })
                            }
                          >
                            Update
                          </Button>
                        </DialogTrigger>
                      </DialogActions>
                    </DialogBody>
                  </DialogSurface>
                </Dialog>

                <Dialog modalType="alert">
                  <DialogTrigger disableButtonEnhancement>
                    <Tooltip withArrow content="Delete" relationship="label">
                      <Button
                        appearance="transparent"
                        icon={
                          deleteDocument.isPending ? (
                            <Spinner />
                          ) : (
                            <DeleteIcon />
                          )
                        }
                        aria-label="Delete"
                        disabled={deleteDocument.isPending}
                      />
                    </Tooltip>
                  </DialogTrigger>
                  <DialogSurface>
                    <DialogBody>
                      <DialogTitle>Delete document</DialogTitle>
                      <DialogContent>
                        Are you sure you wish to delete this document?
                        <br />
                        {props.document.Name}
                      </DialogContent>
                      <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                          <Button appearance="secondary">Cancel</Button>
                        </DialogTrigger>
                        <DialogTrigger disableButtonEnhancement>
                          <Button
                            appearance="primary"
                            onClick={() =>
                              deleteDocument.mutate(props.document)
                            }
                          >
                            Delete
                          </Button>
                        </DialogTrigger>
                      </DialogActions>
                    </DialogBody>
                  </DialogSurface>
                </Dialog>
              </>
            )}
          </>
        }
      />
    </Card>
  );
};

const wordExtensions: string[] = [
  "doc",
  "dot",
  "wbk",
  "docx",
  "docm",
  "dotx",
  "dotm",
  "docb",
];
const excelExtensions: string[] = [
  "xls",
  "xlt",
  "xlm",
  "xlsx",
  "xlsm",
  "xltx",
  "xltm",
  "xlsb",
  "xla",
  "xlam",
  "xll",
  "xlw",
];
const ppExtensions: string[] = [
  "ppt",
  "pot",
  "pps",
  "pptx",
  "pptm",
  "potx",
  "potm",
  "ppam",
  "ppsx",
  "ppsm",
  "sldx",
  "sldm",
];
