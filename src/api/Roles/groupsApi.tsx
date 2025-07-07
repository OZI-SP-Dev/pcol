import { useQuery } from "@tanstack/react-query";
import { spWebContext, subWebContext } from "src/api/SPWebContext";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { z } from "zod";

const Group = z.object({
  Id: z.number().positive(),
  Title: z.string(),
});
type Group = z.infer<typeof Group>;

export const usePKMemberGroup = () => {
  return useQuery({
    queryKey: ["PKMemberGroup"],
    queryFn: () => spWebContext.web.associatedMemberGroup<Group>(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useProgramMemberGroup = (subSite?: string) => {
  return useQuery({
    queryKey: ["ProgramMemberGroup", subSite],
    queryFn: () =>
      subSite
        ? subWebContext(subSite).web.associatedMemberGroup<Group>()
        : Promise.resolve(null),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useProgramOwnerGroup = (subSite?: string) => {
  return useQuery({
    queryKey: ["ProgramOwnerGroup", subSite],
    queryFn: () =>
      subSite
        ? subWebContext(subSite).web.associatedOwnerGroup<Group>()
        : Promise.resolve(null),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
