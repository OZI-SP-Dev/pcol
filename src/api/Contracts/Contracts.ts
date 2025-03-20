import { useQuery } from "@tanstack/react-query";
import { subWebContext } from "src/api/SPWebContext";
import { z } from "zod";
import "@pnp/sp/items";

const spContracts = z.array(
  z.object({
    Id: z.number().int().positive(),
    Title: z.string().max(255, "Title must be 255 characters or less"),
    ContractNumber: z.string(),
    Contractor: z.object({
      Id: z.number().int().positive(),
      Title: z.string(),
    }),
    ContractorPOC: z
      .object({
        Id: z.number().int().positive(),
        Title: z.string(),
      })
      .optional(),
    DODAAC: z.string().length(6, "DODAAC must be 6 characters long"),
  })
);

type spContracts = z.infer<typeof spContracts>;

const getContracts = async (program: string) =>
  subWebContext(program)
    .web.lists.getByTitle("Contracts")
    .items.select(
      "Id",
      "Title",
      "ContractNumber",
      "Contractor/Id",
      "Contractor/Title",
      "ContractorPOC/Id",
      "ContractorPOC/Title",
      "DODAAC"
    )
    .expand("Contractor", "ContractorPOC")<spContracts>();

const transformData = (data: spContracts) => spContracts.parse(data);

export const useContracts = (program: string) => {
  return useQuery({
    queryKey: ["Contracts", program],
    queryFn: () => getContracts(program),
    select: transformData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
