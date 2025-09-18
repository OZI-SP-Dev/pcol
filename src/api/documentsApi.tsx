import "@pnp/sp/files";
import "@pnp/sp/folders";
import { subWebContext } from "src/api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Link,
  Toast,
  ToastBody,
  ToastTitle,
  ToastTrigger,
  useToastController,
} from "@fluentui/react-components";

export const useDocuments = (subSite: string, pcolName: string) => {
  return useQuery({
    queryKey: ["documents", subSite, pcolName],
    queryFn: () => getDocuments(subSite, pcolName),
  });
};

const getDocuments = async (subSite: string, pcolName: string) => {
  const path = "PCOLs/" + pcolName;
  return subWebContext(subSite)
    .web.getFolderByServerRelativePath(path)
    .files.select(
      "Name",
      "TimeLastModified",
      "ServerRelativeUrl",
      "ModifiedBy",
      "ModifiedBy/Id",
      "ModifiedBy/EMail",
      "ModifiedBy/Title",
      "UniqueId",
      "ListId",
      "DocGroup",
      "ListItemAllFields"
    )
    .expand("ListItemAllFields", "ModifiedBy")
    .orderBy("Name")<SPDocument[]>();
};

export const useDeleteDocument = (subSite: string) => {
  const queryClient = useQueryClient();
  const { dispatchToast } = useToastController("toaster");
  return useMutation({
    mutationFn: async (document: SPDocument) => {
      return subWebContext(subSite)
        .web.getFileById(document.UniqueId)
        .recycle();
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["documents", subSite] });
      dispatchToast(
        <Toast>
          <ToastTitle
            action={
              <ToastTrigger>
                <Link>Dismiss</Link>
              </ToastTrigger>
            }
          >
            Deleted {variables.Name}
          </ToastTitle>
          {variables.ListItemAllFields.DocGroup === "Attachment" && (
            <ToastBody>
              Attachments removed after the Draft stage need to be manually
              removed from the PCOL file's attachments list.
            </ToastBody>
          )}
        </Toast>,
        { intent: "success" }
      );
    },
    onError: (error: unknown, variables) => {
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
              Error deleting {variables.Name}
            </ToastTitle>
            <ToastBody>{error.message}</ToastBody>
          </Toast>,
          { intent: "error", timeout: -1 }
        );
      }
    },
  });
};

export const useAddDocument = (
  subSite: string,
  pcolName: string,
  docGroup?: string
) => {
  const queryClient = useQueryClient();
  const { dispatchToast } = useToastController("toaster");
  return useMutation({
    mutationFn: async (file: File) => {
      return subWebContext(subSite)
        .web.getFolderByServerRelativePath(`PCOLs/${pcolName}`)
        .files.addUsingPath(file.name, file, { Overwrite: true });
    },
    onSuccess: async (filedata, variables) => {
      if (docGroup) {
        await (
          await subWebContext(subSite)
            .web.getFileById(filedata.UniqueId)
            .getItem()
        ).update({ DocGroup: docGroup });
        dispatchToast(
          <Toast>
            <ToastTitle
              action={
                <ToastTrigger>
                  <Link>Dismiss</Link>
                </ToastTrigger>
              }
            >
              Added {variables.name}
            </ToastTitle>
            {docGroup === "Attachment" && (
              <ToastBody>
                Attachments added after the Draft stage need to be manually
                added to the PCOL file's attachments list.
              </ToastBody>
            )}
          </Toast>,
          { intent: "success" }
        );
      }
      queryClient.invalidateQueries({
        queryKey: ["documents", subSite, pcolName],
      });
    },
  });
};

export const useEditDocument = (subSite: string) => {
  const queryClient = useQueryClient();
  const { dispatchToast } = useToastController("toaster");

  return useMutation({
    mutationFn: async (item: {
      document: SPDocument;
      metadata: { Name: string; DocGroup: string };
    }) => {
      const promises = [];
      if (
        item.metadata.DocGroup &&
        item.metadata.DocGroup !== item.document.ListItemAllFields.DocGroup
      ) {
        promises.push(
          await subWebContext(subSite)
            .web.lists.getByTitle("PCOLs")
            .items.getById(item.document.ListItemAllFields.Id)
            .update({ DocGroup: item.metadata.DocGroup })
        );
      }

      if (item.metadata.Name && item.metadata.Name !== item.document.Name) {
        const newPath = item.document.ServerRelativeUrl.replace(
          item.document.Name,
          item.metadata.Name
        );
        promises.push(
          subWebContext(subSite)
            .web.getFileByServerRelativePath(item.document.ServerRelativeUrl)
            .moveByPath(newPath, false, false)
        );
      }

      return Promise.all(promises);
    },
    onError: (error: unknown, variables) => {
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
              Error updating {variables.document.Name}
            </ToastTitle>
            <ToastBody>{error.message}</ToastBody>
          </Toast>,
          { intent: "error", timeout: -1 }
        );
      }
    },
    onSuccess: (_data, variables) => {
      if (
        variables.document.ListItemAllFields.DocGroup !==
        variables.metadata.DocGroup
      ) {
        dispatchToast(
          <Toast>
            <ToastTitle
              action={
                <ToastTrigger>
                  <Link>Dismiss</Link>
                </ToastTrigger>
              }
            >
              Updated {variables.document.Name}
            </ToastTitle>
            <ToastBody>
              Attachments added/removed after the Draft stage need to be
              manually added/removed from the PCOL file's attachments list.
            </ToastBody>
          </Toast>,
          { intent: "success" }
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["documents", subSite] });
    },
  });
};

export interface SPDocument {
  Name: string;
  ModifiedBy: { Id: string; EMail: string; Title: string };
  TimeLastModified: string;
  ServerRelativeUrl: string;
  UniqueId: string;
  ListId: string;
  ListItemAllFields: {
    DocGroup: string;
    Id: number;
  };
}
