import { useQuery } from "@tanstack/react-query";
import { spWebContext, subWebContext } from "src/api/SPWebContext";
import { z } from "zod";
import "@pnp/sp/items";

const spDisclaimers = z.array(
  z.object({
    Title: z.string().max(255, "Title must be 255 characters or less"),
    Statement: z.string(),
  })
);

type spDisclaimers = z.infer<typeof spDisclaimers>;

const getDisclaimers = async (program?: string) => {
  const context = program ? subWebContext(program) : spWebContext;
  return context.web.lists.getByTitle("Disclaimers").items<spDisclaimers>();
};

const transformData = (data: spDisclaimers) => spDisclaimers.parse(data);

export const useDisclaimers = (program?: string) => {
  return useQuery({
    queryKey: ["Disclaimers", program ?? "root"],
    queryFn: () => getDisclaimers(program),
    select: transformData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
