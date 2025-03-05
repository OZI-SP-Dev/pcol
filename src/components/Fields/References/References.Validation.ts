import { z } from "zod";

const finalRule = z.string().trim();

export const ReferencesRuleFinal = z.object({
  References: finalRule,
});
