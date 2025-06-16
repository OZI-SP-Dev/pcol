import "@pnp/sp/files";
import "@pnp/sp/folders";
import { spWebContext } from "src/api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Link,
  Toast,
  ToastBody,
  ToastTitle,
  ToastTrigger,
  useToastController,
} from "@fluentui/react-components";

/**
 * Gets all requests
 */
export const useDocuments = (pcolId: number) => {
  return useQuery({
    queryKey: ["documents", pcolId],
    queryFn: () => getDocuments(pcolId),
  });
};

// TODO: Update everything here to handle subwebs
const getDocuments = async (pcolId: number) => {
  const path = "requests/" + pcolId;
  return spWebContext.web
    .getFolderByServerRelativePath(path)
    .files.select(
      "Name",
      "TimeLastModified",
      "ServerRelativeUrl",
      "ModifiedBy",
      "ModifiedBy/Id",
      "ModifiedBy/EMail",
      "ModifiedBy/Title",
      "UniqueId",
      "ListId"
    )
    .expand("ModifiedBy")
    .orderBy("Name")<SPDocument[]>();
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  const { dispatchToast } = useToastController("toaster");
  return useMutation({
    mutationFn: async (document: SPDocument) => {
      return spWebContext.web.getFileById(document.UniqueId).recycle();
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

export const useAddDocument = (pcolId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      return spWebContext.web
        .getFolderByServerRelativePath(`requests/${pcolId}`)
        .files.addUsingPath(file.name, file, { Overwrite: true });
    },
    onSuccess: async () => {
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
}
