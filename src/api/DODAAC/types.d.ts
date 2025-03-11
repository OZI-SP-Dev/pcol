import { z } from "zod";
declare const DODAAC: z.ZodObject<{
    DODAAC: z.ZodString;
    OfficeName: z.ZodString;
    OfficeAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    DODAAC: string;
    OfficeName: string;
    OfficeAddress: string;
}, {
    DODAAC: string;
    OfficeName: string;
    OfficeAddress: string;
}>;
export type DODAAC = z.infer<typeof DODAAC>;
export {};
