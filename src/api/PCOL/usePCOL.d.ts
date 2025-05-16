import "@pnp/sp/items";
export declare const usePCOL: (subSite: string, pcolId: number) => import("@tanstack/react-query").UseQueryResult<{
    Author: {
        Id: number;
        Title: string;
    };
    Id: number;
    Title: string;
    Created: Date;
    Subject: string | null;
    References: string | null;
    DODAAC: string;
    Contract: string;
    DeliveryOrderMod: string | null;
    RFI: string | null;
    RFP: string | null;
    ECP: string | null;
    CCP: string | null;
    AssociatedContractorLetterNumbers: string | null;
    Disclaimers: (string | undefined)[];
    CarbonCopy: string | null;
    AdditionalDistributionInfo: string | null;
}, Error>;
