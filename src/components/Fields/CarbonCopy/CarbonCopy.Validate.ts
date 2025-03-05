import { z } from "zod";

const finalRule = z.string().trim();

export const CarbonCopyRuleFinal = z.object({
  CarbonCopy: finalRule,
});
