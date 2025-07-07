import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups/web";
import { subWebContext } from "src/api/SPWebContext";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { z } from "zod";
import { useCurrentUserHasEditPermissions } from "src/api/permissionsApi";

declare const _spPageContextInfo: { userId: number };

const Role = z.object({
  Id: z.number().positive(),
  Title: z.string(),
  user: z.object({
    Id: z.number().int().positive(),
    Title: z.string(),
    EMail: z.string(),
  }),
});
type Role = z.infer<typeof Role>;

export const useProgramRoles = (subSite?: string) => {
  return useQuery({
    queryKey: ["roles", subSite],
    queryFn: () =>
      subSite
        ? subWebContext(subSite)
            .web.lists.getByTitle("roles")
            .items.select("Id", "Title", "user/Id", "user/Title", "user/EMail")
            .expand("user")<Role[]>()
        : Promise.resolve(null),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useMyRoles = (subSite?: string) => {
  const PKAdmin = useCurrentUserHasEditPermissions();
  const programAdmin = useCurrentUserHasEditPermissions(subSite);
  const programRoles = useProgramRoles(subSite);

  const myData = useMemo(
    () =>
      programRoles.data
        ?.filter((item) => item.user.Id === _spPageContextInfo.userId)
        ?.map((item) => item.Title) as string[],
    [programRoles]
  );

  const myRoles = {
    isPKAdmin: PKAdmin.data || false,
    isAdmin: programAdmin.data || false,
    isCO: myData?.includes("CO"),
    isDistributor: myData?.includes("Distributor"),
    isReviewer: myData?.includes("Reviewer"),
  };

  return myRoles;
};
