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
    queryKey: ["documents", pcolName],
    queryFn: () => getDocuments(subSite, pcolName),
  });
};

// TODO: Update everything here to handle subwebs
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
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      dispatchToast(
        <Toast>
          <ToastTitle>Deleted {variables.Name}</ToastTitle>
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
  return useMutation({
    mutationFn: async (file: File) => {
      return subWebContext(subSite)
        .web.getFolderByServerRelativePath(`PCOLs/${pcolName}`)
        .files.addUsingPath(file.name, file, { Overwrite: true });
    },
    onSuccess: async (filedata) => {
      if (docGroup) {
        await (
          await subWebContext(subSite)
            .web.getFileById(filedata.UniqueId)
            .getItem()
        ).update({ DocGroup: docGroup });
      }
      queryClient.invalidateQueries({ queryKey: ["documents"] });
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
  };
}
