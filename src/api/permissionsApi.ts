import { useQuery } from "@tanstack/react-query";
import "@pnp/sp/lists";
import "@pnp/sp/security";
import { PermissionKind } from "@pnp/sp/security";
import { spWebContext, subWebContext } from "./SPWebContext";

/* Since the Disclaimers list is universal, we can check it on both the base site, 
// and each program's site to see if the user has edit rights.
// This way we don't worry about groups names across the sites, just 'can this user, or not?'
*/
export const useCurrentUserHasEditPermissions = (subSite?: string) => {
  const context = subSite ? subWebContext(subSite) : spWebContext;

  return useQuery({
    queryKey: ["EditPermissions", subSite ?? "root"],
    queryFn: () =>
      context.web.lists
        .getByTitle("Disclaimers")
        .currentUserHasPermissions(PermissionKind.EditListItems),
    staleTime: Infinity, // Prevent refetch
    gcTime: Infinity, // Prevent garbage collection
  });
};
