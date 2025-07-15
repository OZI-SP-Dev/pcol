import "@pnp/sp/content-types";
export declare const useAddPCOL: (subSite: string) => import("@tanstack/react-query").UseMutationResult<any, Error, {
    Subject: string;
    References: string;
    DODAAC: string;
    Contract: string;
    DeliveryOrderMod: string;
    RFI: string;
    RFP: string;
    ECP: string;
    CCP: string;
    AssociatedContractorLetterNumbers: string;
    Disclaimers: string[];
    CarbonCopy: string;
    AdditionalDistributionInfo: string;
}, unknown>;
