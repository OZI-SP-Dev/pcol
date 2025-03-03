import { spWebContext } from "src/api/SPWebContext";
import { useQuery } from "@tanstack/react-query";
import "@pnp/sp/webs";

export const useWebs = () => {
  return useQuery({
    queryKey: ["Webs"],
    queryFn: () => spWebContext.web.webs(),
    staleTime: Infinity, // Prevent refetch
    gcTime: Infinity, // Prevent garbage collection
  });
};
