import "@pnp/sp/files";
import "@pnp/sp/folders";
export declare const useDocuments: (subSite: string, pcolName: string) => import("@tanstack/react-query").UseQueryResult<SPDocument[], Error>;
export declare const useDeleteDocument: (subSite: string) => import("@tanstack/react-query").UseMutationResult<string, unknown, SPDocument, unknown>;
export declare const useAddDocument: (subSite: string, pcolName: string, docGroup?: string) => import("@tanstack/react-query").UseMutationResult<import("@pnp/sp/files").IFileInfo, Error, File, unknown>;
export declare const useEditDocument: (subSite: string) => import("@tanstack/react-query").UseMutationResult<any[], unknown, {
    document: SPDocument;
    metadata: {
        Name: string;
        DocGroup: string;
    };
}, unknown>;
export interface SPDocument {
    Name: string;
    ModifiedBy: {
        Id: string;
        EMail: string;
        Title: string;
    };
    TimeLastModified: string;
    ServerRelativeUrl: string;
    UniqueId: string;
    ListId: string;
    ListItemAllFields: {
        DocGroup: string;
        Id: number;
    };
}
