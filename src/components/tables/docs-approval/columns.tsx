import { ColumnDef } from "@tanstack/react-table";
import { FormDocs } from "@/components/dialogs/docs-approval/FormDocs";
import { DialogDeleteDocsApproval } from "@/components/dialogs/docs-approval/DeleteDocsApproval";
import { DocsComments } from "@/components/dialogs/docs-approval/DocsComments";
import { SendReview } from "@/components/dialogs/docs-approval/SendReview";
import { DialogApprovedDoc } from "@/components/dialogs/docs-approval/ApprovedDoc";

export type Types = {
  id: string;
  phase: "development" | "review" | "approval";
  completed_date: string;
  responsible: string;
  state: {
    development: string;
    review: string;
    approval: string;
  };
  reviewers: string;
  document_name: string;
};

const transformPhase = (state: string) => {
  if (state === "development") return "Elaboración";
  if (state === "review") return "Revisión";
  if (state === "approval") return "Aprovación";
};

const transformDateTime = (dateTimeUTC: string) => {
  const date = new Date(dateTimeUTC);
  const optionsDate = { day: "numeric" as const, month: "long" as const };
  const optionsHour = {
    hour: "2-digit" as const,
    minute: "2-digit" as const,
    timeZone: "America/Mexico_City",
    hour12: true,
  };
  const formattedDate = date.toLocaleDateString("es-ES", optionsDate);
  const formattedHour = date.toLocaleTimeString("es-ES", optionsHour);

  return dateTimeUTC.length === 0
    ? "N/A"
    : `${formattedDate} a las ${formattedHour}`;
};

export const columns = (
  setReloadData: (data: any) => void
): ColumnDef<Types>[] => [
  {
    accessorKey: "phase",
    header: "Fase",
    cell: ({ row }) => (
      <div className="first-letter:capitalize">
        {transformPhase(row.getValue("phase"))}
      </div>
    ),
  },
  {
    accessorKey: "completed_date",
    header: "Fecha completada",
    cell: ({ row }) => <div>{row.getValue("completed_date")}</div>,
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
      const state = row.getValue("state") as Types["state"];
      return (
        <div className="">
          <ul className="list-disc">
            <li>Elaborado: {transformDateTime(state.development)}</li>
            <li>Revisado: {transformDateTime(state.review)}</li>
            <li>Aprobado: {transformDateTime(state.approval)}</li>
          </ul>
        </div>
      );
    },
  },
  {
    accessorKey: "revision",
    header: "Revisión",
    cell: ({ row }) =>
      row.original.phase === "development" ? (
        <SendReview
          setReloadData={setReloadData}
          docs_approval={row.original}
        />
      ) : row.original.phase === "review" ? (
        <DialogApprovedDoc setReloadData={setReloadData} doc={row.original} />
      ) : (
        <div>Documento aprovado</div>
      ),
  },
  {
    accessorKey: "document_name",
    header: "Documento",
    cell: ({ row }) =>
      row.original.document_name === "" ? (
        <div>Sin documento</div>
      ) : (
        <div className="first-letter:capitalize">
          {row.getValue("document_name")}
        </div>
      ),
  },
  {
    accessorKey: "id",
    header: "Opciones",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <DocsComments id={row.getValue("id")} />
        <FormDocs
          mode="update"
          docs_approval={row.original}
          setReloadData={setReloadData}
        />
        <DialogDeleteDocsApproval
          doc={row.original}
          setReloadData={setReloadData}
        />
      </div>
    ),
  },
];
