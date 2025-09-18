import {
  TableCell,
  TableRow,
  TableCellLayout,
  Spinner,
} from "@fluentui/react-components";
import { Link, useParams } from "react-router-dom";
import { usePCOL } from "src/api/PCOL/usePCOL";
import { Task } from "src/api/tasks/tasksApi";
import { PCOLProgressBar } from "./PCOLProgressBar";

const TaskedPCOLsRows = ({
  task,
  allRelatedItems,
}: {
  task: Task;
  allRelatedItems: boolean;
}) => {
  const { program } = useParams();
  const pcol = usePCOL(String(program), task.pcolId);

  if (pcol.isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={6}>
          <TableCellLayout media={<Spinner />}>Loading...</TableCellLayout>
        </TableCell>
      </TableRow>
    );
  }

  const stage = pcol.data?.Stage;
  if (allRelatedItems) {
    // Ignore if from a PCOL that's "done"
    if (["Cancelled", "Distributed", "Rejected"].includes(String(stage))) {
      return;
    }
  } else {
    // Ignore if the current stage does not match our task role
    switch (task.Role) {
      case "Parallel":
        if (stage !== "Peer Review") return;
        break;
      case "Serial":
        if (stage !== "Peer Review") return;
        break;
      case "Final":
        if (stage !== "Final Review") return;
        break;
      case "Org":
        if (stage !== "Organizational Review") return;
        break;
      case "PCO":
        if (stage !== "Approval") return;
        break;
      case "Distributor":
        if (stage !== "Distribution") return;
        break;
    }
  }

  return (
    <TableRow>
      <TableCell>
        <TableCellLayout>
          <Link to={"/p/" + program + "/i/" + pcol.data?.Id}>
            {pcol.data?.Title}
          </Link>
        </TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout>{pcol.data?.Subject}</TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout>
          <PCOLProgressBar stage={String(pcol.data?.Stage)} />
        </TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout>{task.Role}</TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout>
          {pcol.data?.Modified.toLocaleDateString()}
        </TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout>{pcol.data?.Contract}</TableCellLayout>
      </TableCell>
    </TableRow>
  );
};

export default TaskedPCOLsRows;
