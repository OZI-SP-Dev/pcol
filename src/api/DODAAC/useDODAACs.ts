import { useQuery } from "@tanstack/react-query";
import { spWebContext } from "src/api/SPWebContext";
import { z } from "zod";
import "@pnp/sp/items";

const spDODAAC = z.object({
  Title: z.string(),
  OfficeName: z.string(),
  OfficeAddress: z.string(),
});

const transformedSpDODAAC = spDODAAC.transform(({ Title, ...rest }) => ({
  DODAAC: Title,
  ...rest,
}));

type spDODAAC = z.infer<typeof spDODAAC>;

const getDODAACs = async () =>
  spWebContext.web.lists.getByTitle("DODAAC").items.filter("Active eq 1")<
    spDODAAC[]
  >();

const transformData = (data: spDODAAC[]) =>
  data.map((item) => transformedSpDODAAC.parse(item));

export const useDODAACs = () => {
  return useQuery({
    queryKey: ["DODAACs"],
    queryFn: getDODAACs,
    select: transformData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
