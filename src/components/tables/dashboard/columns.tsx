import { ColumnDef } from "@tanstack/react-table";
import { TaskCommnets } from "@/components/dialogs/tasks/TaskComments";
import { FormTask } from "../../dialogs/tasks/FormTask";
import { DialogDeleteTask } from "../../dialogs/tasks/DeleteTask";

export type Tasks = {
  id: string;
  task: string;
  responsible: string;
  state: "ready" | "in_progress" | "stopped";
  expiration: string;
  priority: "low" | "medium" | "important" | "urgent";
  project_id: string;
};

const transformState = (state: string) => {
  if (state === "ready") return "Listo";
  if (state === "in_progress") return "En curso";
  if (state === "stopped") return "Detenido";
};

const transformPriority = (priority: string) => {
  if (priority === "low") return "Baja";
  if (priority === "medium") return "Media";
  if (priority === "important") return "Importante";
  if (priority === "urgent") return "Urgente";
};

export const columns = (setDataTasks: any): ColumnDef<Tasks>[] => [
  {
    accessorKey: "task",
    header: "Tarea",
    cell: ({ row }) => (
      <div className="first-letter:capitalize">{row.getValue("task")}</div>
    ),
  },
  {
    accessorKey: "responsible",
    header: "Responsable",
    cell: ({ row }) => (
      <div className="first-letter:capitalize">
        {row.getValue("responsible")}
      </div>
    ),
  },
  {
    accessorKey: "state",
    header: "Estado",
    cell: ({ row }) => {
      const state = row.getValue("state") as Tasks["state"];
      const variant = {
        ready:
          "capitalize bg-green-500 p-1 rounded-sm w-20 text-white text-center pointer-events-none",
        in_progress:
          "capitalize bg-yellow-400 p-1 rounded-sm w-20 text-white text-center pointer-events-none",
        stopped:
          "capitalize bg-red-600 p-1 rounded-sm w-20 text-white text-center pointer-events-none",
      }[state];
      return <div className={variant}>{transformState(state)}</div>;
    },
  },
  {
    accessorKey: "expiration",
    header: "Vence",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("expiration")}</div>
    ),
  },
  {
    accessorKey: "priority",
    header: "Prioridad",
    cell: ({ row }) => (
      <div className="capitalize">
        {transformPriority(row.getValue("priority"))}
      </div>
    ),
  },
  {
    accessorKey: "comments",
    header: "Comentarios",
    cell: ({ row }) => <TaskCommnets task={row.original} />,
  },
  {
    accessorKey: "id",
    header: "Opciones",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <FormTask
          mode="update"
          task={row.original}
          setDataTasks={setDataTasks}
        />
        <DialogDeleteTask task={row.original} setTasks={setDataTasks} />
      </div>
    ),
  },
];
