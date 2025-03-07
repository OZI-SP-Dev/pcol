import { z } from "zod";

const finalRule = z.array(z.string());

export const DisclaimerRuleFinal = z.object({
  Disclaimer: finalRule,
});
