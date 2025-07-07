import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/comments/item";
export declare const useNotes: (program: string, pcolId: number) => import("@tanstack/react-query").UseQueryResult<import("@pnp/sp/comments/types").ICommentInfo[], Error>;
export declare const useAddNote: (program: string, pcolId: number) => import("@tanstack/react-query").UseMutationResult<import("@pnp/sp/comments/types").IComment & import("@pnp/sp/comments/types").ICommentInfo, Error, string, unknown>;
