import { z } from "zod";

const NewPCOL = z.object({
  Subject: z.string(),
  References: z.string(),
  DODAAC: z.string(), //lookup
  Contract: z.string(), //lookup
  DeliveryOrderMod: z.string(),
  RFI: z.string(),
  RFP: z.string(),
  ECP: z.string(),
  CCP: z.string(),
  AssociatedContractorLetterNumbers: z.string(),
  Disclaimers: z.array(z.string()),
  CarbonCopy: z.string(),
  AdditionalDistributionInfo: z.string(),
});

export type NewPCOL = z.infer<typeof NewPCOL>;
