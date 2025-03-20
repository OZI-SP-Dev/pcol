import "@pnp/sp/items";
export declare const useDisclaimers: (program?: string) => import("@tanstack/react-query").UseQueryResult<{
    Title: string;
    Statement: string;
}[], Error>;
