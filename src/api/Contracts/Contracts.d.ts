import "@pnp/sp/items";
export declare const useContracts: (program: string) => import("@tanstack/react-query").UseQueryResult<{
    Id: number;
    Title: string;
    DODAAC: string;
    Contractor: {
        Id: number;
        Title: string;
    };
    ContractNumber: string;
    ContractorPOC?: {
        Id: number;
        Title: string;
    } | undefined;
}[], Error>;
