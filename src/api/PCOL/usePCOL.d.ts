import { z } from "zod";
import "@pnp/sp/items";
export declare const spPCOL: z.ZodObject<{
    Id: z.ZodNumber;
    Title: z.ZodString;
    Author: z.ZodObject<{
        Id: z.ZodNumber;
        Title: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        Id: number;
        Title: string;
    }, {
        Id: number;
        Title: string;
    }>;
    Modified: z.ZodDate;
    Created: z.ZodDate;
    Subject: z.ZodNullable<z.ZodString>;
    References: z.ZodNullable<z.ZodString>;
    DODAAC: z.ZodString;
    Contract: z.ZodString;
    DeliveryOrderMod: z.ZodNullable<z.ZodString>;
    RFI: z.ZodNullable<z.ZodString>;
    RFP: z.ZodNullable<z.ZodString>;
    ECP: z.ZodNullable<z.ZodString>;
    CCP: z.ZodNullable<z.ZodString>;
    AssociatedContractorLetterNumbers: z.ZodNullable<z.ZodString>;
    Disclaimers: z.ZodPipeline<z.ZodEffects<z.ZodEffects<z.ZodNullable<z.ZodString>, string | null, string | null>, any, string | null>, z.ZodArray<z.ZodOptional<z.ZodString>, "many">>;
    CarbonCopy: z.ZodNullable<z.ZodString>;
    AdditionalDistributionInfo: z.ZodNullable<z.ZodString>;
    Stage: z.ZodString;
}, "strip", z.ZodTypeAny, {
    Id: number;
    Title: string;
    Disclaimers: (string | undefined)[];
    Subject: string | null;
    Author: {
        Id: number;
        Title: string;
    };
    Modified: Date;
    Created: Date;
    References: string | null;
    DODAAC: string;
    Contract: string;
    DeliveryOrderMod: string | null;
    RFI: string | null;
    RFP: string | null;
    ECP: string | null;
    CCP: string | null;
    AssociatedContractorLetterNumbers: string | null;
    CarbonCopy: string | null;
    AdditionalDistributionInfo: string | null;
    Stage: string;
}, {
    Id: number;
    Title: string;
    Disclaimers: string | null;
    Subject: string | null;
    Author: {
        Id: number;
        Title: string;
    };
    Modified: Date;
    Created: Date;
    References: string | null;
    DODAAC: string;
    Contract: string;
    DeliveryOrderMod: string | null;
    RFI: string | null;
    RFP: string | null;
    ECP: string | null;
    CCP: string | null;
    AssociatedContractorLetterNumbers: string | null;
    CarbonCopy: string | null;
    AdditionalDistributionInfo: string | null;
    Stage: string;
}>;
export type spPCOL = z.infer<typeof spPCOL>;
export declare const usePCOL: (subSite: string, pcolId: number) => import("@tanstack/react-query").UseQueryResult<{
    Id: number;
    Title: string;
    Disclaimers: (string | undefined)[];
    Subject: string | null;
    Author: {
        Id: number;
        Title: string;
    };
    Modified: Date;
    Created: Date;
    References: string | null;
    DODAAC: string;
    Contract: string;
    DeliveryOrderMod: string | null;
    RFI: string | null;
    RFP: string | null;
    ECP: string | null;
    CCP: string | null;
    AssociatedContractorLetterNumbers: string | null;
    CarbonCopy: string | null;
    AdditionalDistributionInfo: string | null;
    Stage: string;
}, Error>;
