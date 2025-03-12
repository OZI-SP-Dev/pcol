import { z } from "zod";

const DODAAC = z.object({
  DODAAC: z.string().length(6, "DODAAC must be 6 characters"),
  OfficeName: z.string().max(255, "Office Name cannot exceed 255 characters"),
  OfficeAddress: z.string(),
});

export type DODAAC = z.infer<typeof DODAAC>;
