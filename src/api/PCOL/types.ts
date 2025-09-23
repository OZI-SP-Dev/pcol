import { z } from "zod";

const NewPCOL = z
  .object({
    Subject: z.string(),
    References: z.string(),
    DODAAC: z.string(), //lookup
    Contract: z.string(), //lookup
    Contractor: z.string().optional(), //lookup
    DeliveryOrderMod: z.string(),
    RFI: z.string(),
    RFP: z.string(),
    ECP: z.string(),
    CCP: z.string(),
    AssociatedContractorLetterNumbers: z.string(),
    Disclaimers: z.array(z.string()),
    CarbonCopy: z.string(),
    AdditionalDistributionInfo: z.string(),
  })
  .refine(
    (pcol) =>
      pcol.Contract !== "No Established Contract" ||
      (pcol.Contractor !== undefined && pcol.Contractor.length >= 3)
  );

export type NewPCOL = z.infer<typeof NewPCOL>;
