import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must enter a Subject")
  .max(250, "Subject cannot exceed 250 characters");

export const SubjectRuleFinal = z.object({
  Subject: finalRule,
});
