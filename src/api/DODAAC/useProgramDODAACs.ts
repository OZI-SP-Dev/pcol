import { useQuery } from "@tanstack/react-query";
import { subWebContext } from "src/api/SPWebContext";
import "@pnp/sp/items";

type spMyDODAACs = {
  Title: string;
}[];

const getDODAACs = async (subSite: string) =>
  subWebContext(subSite).web.lists.getByTitle("DODAAC").items<spMyDODAACs>();

// Turn array of spMyDODAACs into regular string array
const transformData = (data: spMyDODAACs) => data.map((item) => item.Title);

export const useProgramDODAACs = (subSite: string) => {
  return useQuery({
    queryKey: ["ProgramDODAACs", subSite],
    queryFn: () => getDODAACs(subSite),
    select: transformData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
