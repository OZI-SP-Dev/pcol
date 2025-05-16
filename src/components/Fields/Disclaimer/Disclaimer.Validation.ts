import { z } from "zod";

const finalRule = z.array(z.string());

export const DisclaimersRuleFinal = z.object({
  Disclaimers: finalRule,
});
