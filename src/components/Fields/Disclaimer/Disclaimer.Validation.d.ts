import { z } from "zod";
export declare const DisclaimersRuleFinal: z.ZodObject<{
    Disclaimers: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    Disclaimers: string[];
}, {
    Disclaimers: string[];
}>;
