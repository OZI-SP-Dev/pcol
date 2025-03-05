import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .regex(
    /^((?:(?:.{0,24})(?:\n|$))*)$/,
    "Enter one Associated Contractor Letter Number per line, each line cannot exceed 24 characters"
  );

export const AssociatedContractorLetterNumbersRuleFinal = z.object({
  AssociatedContractorLetterNumbers: finalRule,
});
