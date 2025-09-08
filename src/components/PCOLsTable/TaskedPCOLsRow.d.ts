import { Task } from "src/api/tasks/tasksApi";
declare const TaskedPCOLsRows: ({ task, allRelatedItems, }: {
    task: Task;
    allRelatedItems: boolean;
}) => import("react/jsx-runtime").JSX.Element | undefined;
export default TaskedPCOLsRows;
