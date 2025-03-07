import { z } from "zod";
export declare const DisclaimerRuleFinal: z.ZodObject<{
    Disclaimer: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    Disclaimer: string[];
}, {
    Disclaimer: string[];
}>;
