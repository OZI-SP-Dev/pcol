import { z } from "zod";

const finalRule = z.string().trim();

export const DisclaimerRuleFinal = z.object({
  Disclaimer: finalRule,
});
