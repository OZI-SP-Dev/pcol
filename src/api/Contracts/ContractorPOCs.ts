import { useQuery } from "@tanstack/react-query";
import { subWebContext } from "src/api/SPWebContext";
import { z } from "zod";
import "@pnp/sp/items";

const spContractorPOCs = z.array(
  z.object({
    Id: z.number().int().positive(),
    Title: z.string().max(255, "Title must be 255 characters or less"),
    Phone: z.string(),
    Email: z.string().email(),
    Contractor: z.object({
      Id: z.number().int().positive(),
      Title: z.string(),
    }),
  })
);

type spContractorPOCs = z.infer<typeof spContractorPOCs>;

const getContractorPOCs = async (program: string) =>
  subWebContext(program)
    .web.lists.getByTitle("ContractorPOCs")
    .items.select(
      "Id",
      "Title",
      "Phone",
      "Email",
      "Contractor/Id",
      "Contractor/Title"
    )
    .expand("Contractor")<spContractorPOCs>();

const transformData = (data: spContractorPOCs) => spContractorPOCs.parse(data);

export const useContractors = (program: string) => {
  return useQuery({
    queryKey: ["ContractorPOCs", program],
    queryFn: () => getContractorPOCs(program),
    select: transformData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
