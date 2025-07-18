import { Icon } from "@fluentui/react";
import { Card, Label, Spinner } from "@fluentui/react-components";
import { useAddDocument } from "src/api/documentsApi";
import { ChangeEvent, DragEventHandler, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const DocumentUploader = (props: {
  pcolName: string;
  docGroup?: string;
}) => {
  const params = useParams();
  const program = String(params.program);
  const addDocument = useAddDocument(program, props.pcolName, props.docGroup);
  const [inDropZone, setInDropZone] = useState(false);
  const dropDepth = useRef(0);

  const handleDragEnter: DragEventHandler = (event) => {
    event.preventDefault();
    dropDepth.current += 1;
    if (dropDepth.current > 0) {
      setInDropZone(true);
    }
  };

  const handleDragLeave: DragEventHandler = (event) => {
    event.preventDefault();
    dropDepth.current -= 1;
    if (dropDepth.current < 1) {
      setInDropZone(false);
    }
  };

  const handleDragOver: DragEventHandler = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop: DragEventHandler = (event) => {
    event.preventDefault();
    setInDropZone(false);
    dropDepth.current = 0;

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...event.dataTransfer.items].forEach((item) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) {
            addDocument.mutate(file);
          }
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach((file) => {
        addDocument.mutate(file);
      });
    }
  };

  const fileInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        addDocument.mutate(event.target.files[i]);
      }
    }
  };

  return (
    <Card
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      appearance="outline"
      style={{ textAlign: "center" }}
      className={inDropZone ? "inDropZone" : ""}
      id="documentDropZone"
    >
      <input
        type="file"
        style={{ display: "none" }}
        onChange={fileInputOnChange}
        id="fileUploader"
        multiple
        disabled={addDocument.isPending}
      />
      {addDocument.isPending && (
        <Spinner
          role="status"
          labelPosition="after"
          label="Uploading document(s)..."
        />
      )}
      {!addDocument.isPending && (
        <Label size="large" htmlFor="fileUploader" weight="semibold">
          <Icon iconName="Upload" />
          <strong>
            Upload one or more {props.docGroup || ""} files, or drag them here.
          </strong>
        </Label>
      )}
    </Card>
  );
};
