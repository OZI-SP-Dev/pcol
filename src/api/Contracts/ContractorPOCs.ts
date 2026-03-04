import { useQuery } from "@tanstack/react-query";
import { subWebContext } from "src/api/SPWebContext";
import { z } from "zod";
import "@pnp/sp/items";

const spContractorPOC = z.object({
  Id: z.number().int().positive(),
  Title: z.string().max(255, "Title must be 255 characters or less"),
  Phone: z.string().nullable(),
  Email: z.string().nullable(),
  Contractor: z.object({
    Id: z.number().int().positive(),
    Title: z.string(),
  }),
});

const spContractorPOCs = z.array(spContractorPOC);

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
      "Contractor/Title",
    )
    .orderBy("Title")
    .expand("Contractor")<spContractorPOCs>();

const transformData = (data: spContractorPOCs) =>
  data
    .map((item) => spContractorPOC.safeParse(item))
    .filter((result) => result.success) //only keep objects that match our type
    .map((result) => result.data);

export const useContractorPOCs = (program: string) => {
  return useQuery({
    queryKey: ["ContractorPOCs", program],
    queryFn: () => getContractorPOCs(program),
    select: transformData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
