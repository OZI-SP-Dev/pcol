import "@pnp/sp/items";
export declare const useContracts: (program: string) => import("@tanstack/react-query").UseQueryResult<{
    Id: number;
    Title: string;
    ContractNumber: string;
    Contractor: {
        Id: number;
        Title: string;
    };
    ContractorPOC?: {
        Id: number;
        Title: string;
    } | undefined;
}[], Error>;
