import "@pnp/sp/content-types";
import {
  Link,
  Toast,
  ToastTitle,
  ToastTrigger,
  useToastController,
} from "@fluentui/react-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { subWebContext } from "src/api/SPWebContext";
import { NewPCOL } from "./types";
import { useGetSequenceNumber } from "src/api/SequenceNumber/useSequenceNumber";

/**
 * Queries the "pcol" list for available content types
 * The internal Id of the PCOLDocSet is neeeded when creating
 * new requests
 */
const useContentTypes = (subSite: string) => {
  return useQuery({
    queryKey: ["contentTypes", "requests"],
    queryFn: () =>
      subWebContext(subSite).web.lists.getByTitle("pcols").contentTypes(),
    staleTime: Infinity, // Prevent refetch
    gcTime: Infinity, // Prevent garbage collection
  });
};

function daysIntoYear(date: Date) {
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
}

export const useAddPCOL = (subSite: string) => {
  const queryClient = useQueryClient();
  const contentTypes = useContentTypes(subSite);
  const getSequenceNumber = useGetSequenceNumber(subSite);
  const { dispatchToast } = useToastController("toaster");

  return useMutation({
    mutationFn: async (newPCOL: NewPCOL) => {
      // We must have the ID of PCOLDocSet in order to create our DocSet folder
      let contentTypeId = "";
      if (contentTypes.data) {
        contentTypeId =
          contentTypes.data.find((ct) => ct.Name === "PCOLDocSet")?.StringId ||
          "";
      } else {
        throw new Error("PCOLDocSet Content Type not available to be created");
      }

      const now = new Date();
      // Initialize folder using ISO Date String
      // After folder is successfully created grab the next SEQ
      // Then convert to PCOLDocSet and rename it using SEQ
      const newFolder = await subWebContext(subSite)
        .web.lists.getByTitle("pcols")
        .rootFolder.folders.addUsingPath(now.toISOString().replace(/:/g, "-"));

      const newFolderFields = await subWebContext(subSite)
        .web.getFolderByServerRelativePath(newFolder.ServerRelativeUrl)
        .listItemAllFields();
      const id = newFolderFields.Id;

      const { Disclaimers, ...rest } = newPCOL;

      // Folder name format: [DODAAC-YYYYDDD-SEQ]
      const seq = await getSequenceNumber.mutateAsync(newPCOL.Subject);
      const folderName =
        newPCOL.DODAAC +
        "-" +
        now.getFullYear() +
        daysIntoYear(now) +
        "-" +
        seq;

      await subWebContext(subSite)
        .web.lists.getByTitle("pcols")
        .items.getById(id)
        .update({
          FileLeafRef: folderName, // rename folder
          Title: folderName,
          ContentTypeId: contentTypeId, // update to PCOLDocSet content type
          Disclaimers: JSON.stringify(Disclaimers),
          Stage: "New",
          ...rest,
        });

      return id;
    },
    onSuccess: () => {
      // Mark requests as needing refreshed
      queryClient.invalidateQueries({ queryKey: ["pcols"] });
      dispatchToast(
        <Toast>
          <ToastTitle>PCOL saved!</ToastTitle>
        </Toast>,
        { intent: "success" }
      );
    },
    onError: (error) => {
      console.log(error);
      dispatchToast(
        <Toast>
          <ToastTitle
            action={
              <ToastTrigger>
                <Link>Dismiss</Link>
              </ToastTrigger>
            }
          >
            Error saving request
          </ToastTitle>
        </Toast>,
        { intent: "error", timeout: -1 }
      );
    },
  });
};
