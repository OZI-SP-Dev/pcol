import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .max(24, "Request for Proposal (RFP) cannot exceed 24 characters");

export const RFPRuleFinal = z.object({
  RFP: finalRule,
});
