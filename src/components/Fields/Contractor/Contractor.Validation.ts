import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .min(3, "You must select a Contractor from the list")
  .optional();

export const ContractorRuleFinal = z.object({
  Contractor: finalRule,
});
