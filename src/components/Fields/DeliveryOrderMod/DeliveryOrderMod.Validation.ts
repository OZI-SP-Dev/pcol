import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .max(24, "Modification / Delivery Order cannot exceed 24 characters");

export const DeliveryOrderModRuleFinal = z.object({
  DeliveryOrderMod: finalRule,
});
