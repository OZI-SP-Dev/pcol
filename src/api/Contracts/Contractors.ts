import { useQuery } from "@tanstack/react-query";
import { subWebContext } from "src/api/SPWebContext";
import { z } from "zod";
import "@pnp/sp/items";

const spContractors = z.array(
  z.object({
    Id: z.number().int().positive(),
    Title: z.string().max(255, "Title must be 255 characters or less"),
    Address: z.string(),
    ContractorPOC: z
      .object({
        Id: z.number().int().positive(),
        Title: z.string(),
      })
      .optional(),
  })
);

type spContractors = z.infer<typeof spContractors>;

const getContractors = async (program: string) =>
  subWebContext(program)
    .web.lists.getByTitle("Contractors")
    .items.select(
      "Id",
      "Title",
      "Address",
      "ContractorPOC/Id",
      "ContractorPOC/Title"
    )
    .expand("Contractor", "ContractorPOC")<spContractors>();

const transformData = (data: spContractors) => spContractors.parse(data);

export const useContractors = (program: string) => {
  return useQuery({
    queryKey: ["Contractors", program],
    queryFn: () => getContractors(program),
    select: transformData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
