import "@pnp/sp/files";
import "@pnp/sp/folders";
/**
 * Gets all requests
 */
export declare const useDocuments: (pcolId: number) => import("@tanstack/react-query").UseQueryResult<SPDocument[], Error>;
export declare const useDeleteDocument: () => import("@tanstack/react-query").UseMutationResult<string, unknown, SPDocument, unknown>;
export declare const useAddDocument: (pcolId: number) => import("@tanstack/react-query").UseMutationResult<import("@pnp/sp/files").IFileInfo, Error, File, unknown>;
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
}
