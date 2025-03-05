import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .max(24, "Request for Information (RFI) cannot exceed 24 characters");

export const RFIRuleFinal = z.object({
  RFI: finalRule,
});
