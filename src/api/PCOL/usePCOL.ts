import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { subWebContext } from "src/api/SPWebContext";
import "@pnp/sp/items";

const spPCOL = z.object({
  Id: z.number().int().positive(),
  Title: z.string(),
  Author: z.object({
    Id: z.number().int().positive(),
    Title: z.string(),
  }),
  Created: z.coerce.date(),
  Subject: z.string().nullable(),
  References: z.string().nullable(),
  DODAAC: z.string(),
  Contract: z.string(),
  DeliveryOrderMod: z.string().nullable(),
  RFI: z.string().nullable(),
  RFP: z.string().nullable(),
  ECP: z.string().nullable(),
  CCP: z.string().nullable(),
  AssociatedContractorLetterNumbers: z.string().nullable(),
  Disclaimers: z
    .string()
    .nullable()
    // make sure it's a JSON string
    .refine((value) => {
      if (value) {
        try {
          JSON.parse(value);
          return true;
        } catch {
          return false;
        }
      }
      return true;
    })
    // convert from JSON string
    .transform((value) => {
      if (value) {
        return JSON.parse(value);
      } else {
        return [];
      }
    })
    // validate the shape
    .pipe(z.array(z.string().optional())),
  CarbonCopy: z.string().nullable(),
  AdditionalDistributionInfo: z.string().nullable(),
});

type spPCOL = z.infer<typeof spPCOL>;

const getPCOL = async (subSite: string, pcolId: number) => {
  if (!pcolId) {
    return Promise.reject();
  }

  const requestedFields = "*," + "Author/Id,Author/EMail,Author/Title";

  const expandedFields = "Author";

  return subWebContext(subSite)
    .web.lists.getByTitle("PCOLs")
    .items.getById(pcolId)
    .select(requestedFields)
    .expand(expandedFields)<spPCOL>();
};

const transformPCOL = (data: spPCOL) => spPCOL.parse(data);

export const usePCOL = (subSite: string, pcolId: number) => {
  return useQuery({
    queryKey: ["PCOL", subSite, pcolId],
    queryFn: () => getPCOL(subSite, pcolId),
    select: transformPCOL,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
