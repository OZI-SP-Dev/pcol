import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .max(24, "Contract Change Proposal (CCP) cannot exceed 24 characters");

export const CCPRuleFinal = z.object({
  CCP: finalRule,
});
