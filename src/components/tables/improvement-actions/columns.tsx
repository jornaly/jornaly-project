import { ColumnDef } from "@tanstack/react-table";
import { FormImprovements } from "@/components/dialogs/improvement-actions/FormImprovemts";
import { DialogDeleteImprovement } from "@/components/dialogs/improvement-actions/DeleteImprovement";

export type Types = {
  id: string;
  process_name: string;
  improvement_actions: string;
  responsible: string;
  expected_date: string;
  completed_date: string;
};

export const columns = (
  setReloadData: (data: any) => void
): ColumnDef<Types>[] => [
  {
    accessorKey: "process_name",
    header: "Proceso",
    cell: ({ row }) => (
      <div className="first-letter:capitalize">
        {row.getValue("process_name")}
      </div>
    ),
  },
  {
    accessorKey: "improvement_actions",
    header: "Acciones de mejora",
    cell: ({ row }) => (
      <div className="first-letter:capitalize">
        {row.getValue("improvement_actions")}
      </div>
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
    accessorKey: "expected_date",
    header: "Fecha prevista",
    cell: ({ row }) => <div>{row.getValue("expected_date")}</div>,
  },
  {
    accessorKey: "completed_date",
    header: "Fecha completada",
    cell: ({ row }) => <div>{row.getValue("completed_date")}</div>,
  },
  {
    accessorKey: "id",
    header: "Opciones",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <FormImprovements
          mode="update"
          improvement_action={row.original}
          setReloadData={setReloadData}
        />
        <DialogDeleteImprovement
          id={row.getValue("id")}
          setReloadData={setReloadData}
        />
      </div>
    ),
  },
];
