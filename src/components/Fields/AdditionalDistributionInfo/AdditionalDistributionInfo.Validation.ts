import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .max(255, "Additional Distribution Information cannot exceed 255 characters");

export const AdditionalDistributionInfoRuleFinal = z.object({
  AdditionalDistributionInfo: finalRule,
});
