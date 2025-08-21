import "@pnp/sp/content-types";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
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
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { useContracts } from "src/api/Contracts/Contracts";
import { useContractors } from "src/api/Contracts/Contractors";
import { useDODAACs } from "src/api/DODAAC/useDODAACs";
import { useDisclaimers } from "src/api/Disclaimer/useDisclaimers";

type Data = string | ArrayBuffer | Uint8Array;

function nullGetter(part: Docxtemplater.DXT.Part) {
  if (part.raw) {
    return "{" + part.raw + "}";
  }
  if (!part.module && part.value) {
    return "{" + part.value + "}";
  }
  return "";
}

/**
 * Queries the "pcol" list for available content types
 * The internal Id of the PCOLDocSet is neeeded when creating
 * new requests
 */
const useContentTypes = (subSite: string) => {
  return useQuery({
    queryKey: ["contentTypes", "requests"],
    queryFn: () =>
      subWebContext(subSite).web.lists.getByTitle("PCOLs").contentTypes(),
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
  const DODAACs = useDODAACs();
  const Contracts = useContracts(subSite);
  const Contractors = useContractors(subSite);
  const GlobalDisclaimers = useDisclaimers();
  const ProgramDisclaimers = useDisclaimers(subSite);
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
        .web.lists.getByTitle("PCOLs")
        .rootFolder.folders.addUsingPath(now.toISOString().replace(/:/g, "-"));

      const newFolderFields = await subWebContext(subSite)
        .web.getFolderByServerRelativePath(newFolder.ServerRelativeUrl)
        .listItemAllFields();
      const id = newFolderFields.Id;

      await subWebContext(subSite)
        .web.lists.getByTitle("notes")
        .items.add({ Title: id.toString() });

      const { Disclaimers, ...rest } = newPCOL;
      const fullDisclaimers = [] as string[];

      for (const disclaimer of Disclaimers) {
        const pref = disclaimer.charAt(0);
        const title = disclaimer.slice(1);
        let statement;
        if (pref === "g") {
          //global disclaimer
          statement = GlobalDisclaimers.data?.find(
            (gd) => gd.Title === title
          )?.Statement;
        }
        if (pref === "p") {
          //program disclaimer
          statement = ProgramDisclaimers.data?.find(
            (pd) => pd.Title === title
          )?.Statement;
        }
        if (statement) {
          fullDisclaimers.push(statement);
        }
      }

      // Folder name format: [DODAAC-YYYYDDD-SEQ]
      const seq = await getSequenceNumber.mutateAsync(newPCOL.Subject);
      const folderName =
        newPCOL.DODAAC +
        "-" +
        now.getFullYear() +
        daysIntoYear(now).toString().padStart(3, "0") +
        "-" +
        seq;

      await subWebContext(subSite)
        .web.lists.getByTitle("PCOLs")
        .items.getById(id)
        .update({
          FileLeafRef: folderName, // rename folder
          Title: folderName,
          ContentTypeId: contentTypeId, // update to PCOLDocSet content type
          Disclaimers: JSON.stringify(Disclaimers),
          Stage: "Draft",
          ...rest,
        });

      PizZipUtils.getBinaryContent(
        ".\\PCOLTemplate.docx",
        async function (error: Error, content: Data) {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new Docxtemplater(zip, {
            nullGetter,
            paragraphLoop: true,
            linebreaks: true,
          });

          const contract = Contracts.data?.find(
            (contract) => contract.ContractNumber === newPCOL.Contract
          );

          const addressee = Contractors.data?.find(
            (contractor) => contractor.Id === contract?.Contractor.Id
          );

          const office = DODAACs.data?.find(
            (dodaac) => dodaac.DODAAC === newPCOL.DODAAC
          );

          await doc.renderAsync({
            ...newPCOL,
            ControlNumber: folderName,
            Addressee: addressee?.Address,
            OriginatingOffice: `${office?.OfficeName}\n${office?.OfficeAddress}`,
            Disclaimers: fullDisclaimers,
          });
          const out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            compression: "DEFLATE",
          });

          const templateFile = await subWebContext(subSite)
            .web.getFolderById(newFolder.UniqueId)
            .files.addUsingPath(folderName + ".docx", out);

          await (
            await subWebContext(subSite)
              .web.getFileById(templateFile.UniqueId)
              .getItem()
          )
            .update({ DocGroup: "PCOL" })
            .then(() =>
              queryClient.invalidateQueries({
                queryKey: ["documents", subSite],
              })
            );
        }
      );

      return id;
    },
    onSuccess: () => {
      // Mark requests as needing refreshed
      queryClient.invalidateQueries({ queryKey: ["paged-PCOLs"] });
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
