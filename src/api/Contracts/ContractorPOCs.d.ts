import "@pnp/sp/items";
export declare const useContractorPOCs: (program: string) => import("@tanstack/react-query").UseQueryResult<{
    Id: number;
    Title: string;
    Contractor: {
        Id: number;
        Title: string;
    };
    Phone: string;
    Email: string;
}[], Error>;
