import { z } from "zod";
interface SortParams {
    sortColumn: string | number | undefined;
    sortDirection: "ascending" | "descending";
}
export interface PCOLFilter {
    column: string;
    filter: string | Date | number;
    modifier?: string;
    queryString: string;
}
declare const PagedPCOLs: z.ZodArray<z.ZodObject<Pick<{
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
}, "Id" | "Title" | "Subject" | "Modified" | "Contract" | "Stage">, "strip", z.ZodTypeAny, {
    Id: number;
    Title: string;
    Subject: string | null;
    Modified: Date;
    Contract: string;
    Stage: string;
}, {
    Id: number;
    Title: string;
    Subject: string | null;
    Modified: Date;
    Contract: string;
    Stage: string;
}>, "many">;
type PagedPCOLs = z.infer<typeof PagedPCOLs>;
export interface PagedResult {
    items: PagedPCOLs;
    hasNextPage: boolean;
}
export declare const usePagedPCOLs: (subSite: string, page: number | undefined, sortParams: SortParams | undefined, filterParams: PCOLFilter[], allItems?: boolean) => import("@tanstack/react-query").UseQueryResult<{
    items: {
        Id: number;
        Title: string;
        Subject: string | null;
        Modified: Date;
        Contract: string;
        Stage: string;
    }[];
    hasNextPage: boolean;
}, Error>;
export {};
