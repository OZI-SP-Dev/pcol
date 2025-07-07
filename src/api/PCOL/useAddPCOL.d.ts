import "@pnp/sp/content-types";
export declare const useAddPCOL: (subSite: string) => import("@tanstack/react-query").UseMutationResult<any, Error, {
    Disclaimers: string[];
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
    CarbonCopy: string;
    AdditionalDistributionInfo: string;
}, unknown>;
