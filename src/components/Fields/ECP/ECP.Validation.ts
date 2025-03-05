import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .max(24, "Engineering Change Proposal (ECP) cannot exceed 24 characters");

export const ECPRuleFinal = z.object({
  ECP: finalRule,
});
