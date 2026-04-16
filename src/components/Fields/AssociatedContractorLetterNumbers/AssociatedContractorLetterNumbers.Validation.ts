import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .regex(
    /^((?:(?:.{0,48})(?:\n|$))*)$/,
    "Enter one Associated Contractor Letter Number per line, each line cannot exceed 48 characters",
  );

export const AssociatedContractorLetterNumbersRuleFinal = z.object({
  AssociatedContractorLetterNumbers: finalRule,
});
