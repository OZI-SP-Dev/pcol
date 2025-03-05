import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must select a Contract from the list");

export const ContractRuleFinal = z.object({
  Contract: finalRule,
});
