import "@pnp/sp/items";
export declare const useContractors: (program: string) => import("@tanstack/react-query").UseQueryResult<{
    Id: number;
    Title: string;
    Address: string;
    ContractorPOC?: {
        Id: number;
        Title: string;
    } | undefined;
}[], Error>;
