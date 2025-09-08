import {
  TableBody,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
} from "@fluentui/react-components";
import { useParams } from "react-router-dom";
import { useMyTasks } from "src/api/tasks/tasksApi";
import TaskedPCOLsRows from "./TaskedPCOLsRow";

const columns = [
  { columnKey: "Title", label: "Control Number" },
  { columnKey: "Subject", label: "Subject Title" },
  { columnKey: "Stage", label: "Stage" },
  { columnKey: "Modified", label: "Modified" },
  { columnKey: "Contract", label: "Contract" },
];

const TaskedPCOLsTable = ({
  allRelatedItems = false,
}: {
  allRelatedItems: boolean;
}) => {
  const { program } = useParams();
  const myTasks = useMyTasks(String(program));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell key={column.columnKey}>
              {column.label}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {myTasks.data?.map((task) => (
          <TaskedPCOLsRows
            task={task}
            key={task.Id}
            allRelatedItems={allRelatedItems}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskedPCOLsTable;
