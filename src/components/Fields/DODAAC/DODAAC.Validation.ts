import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must select a DODAAC from the list");

export const DODAACRuleFinal = z.object({
  DODAAC: finalRule,
});
