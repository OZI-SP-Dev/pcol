import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .min(3, "You must select a Contractor POC from the list");

export const ContractorPOCRuleFinal = z.object({
  ContractorPOC: finalRule,
});
