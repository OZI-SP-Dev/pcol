import { useQuery } from "@tanstack/react-query";
import "@pnp/sp/lists";
import "@pnp/sp/security";
import { PermissionKind } from "@pnp/sp/security";
import { spWebContext, subWebContext } from "./SPWebContext";

declare const _spPageContextInfo: { webServerRelativeUrl: string };

/* Since the Disclaimers list is universal, we can check it on both the base site, 
// and each program's site to see if the user has edit rights.
// This way we don't worry about groups names across the sites, just 'can this user, or not?'
*/
export const useCurrentUserHasEditPermissions = (subSite?: string) => {
  const listUrl =
    _spPageContextInfo.webServerRelativeUrl +
    (subSite ? "/" + subSite : "") +
    "/Lists/Disclaimers";

  const context = subSite ? subWebContext(subSite) : spWebContext;

  return useQuery({
    queryKey: ["EditPermissions", listUrl],
    queryFn: () =>
      context.web
        .getList(listUrl)
        .currentUserHasPermissions(PermissionKind.EditListItems),
    staleTime: Infinity, // Prevent refetch
    gcTime: Infinity, // Prevent garbage collection
  });
};
