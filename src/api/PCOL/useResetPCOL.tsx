import "@pnp/sp/content-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subWebContext } from "src/api/SPWebContext";
import { useTasks } from "../tasks/tasksApi";

export const useResetPCOL = (subSite: string, pcolId: number) => {
  const queryClient = useQueryClient();
  const tasks = useTasks(subSite, pcolId);

  return useMutation({
    mutationFn: async () => {
      const [batched, execute] = subWebContext(subSite).batched();
      const batch = batched.web.lists.getByTitle("tasks");

      tasks.data?.forEach((task) => batch.items.getById(task.Id).delete());
      await execute();

      return subWebContext(subSite)
        .web.lists.getByTitle("pcols")
        .items.getById(pcolId)
        .update({ Stage: "Draft" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["PCOL", subSite, pcolId] });
      queryClient.invalidateQueries({ queryKey: ["tasks", subSite, pcolId] });
      queryClient.invalidateQueries({ queryKey: ["paged-PCOLs"] });
    },
  });
};
