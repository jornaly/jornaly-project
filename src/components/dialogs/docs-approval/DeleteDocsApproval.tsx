import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteDocsApproval, deleteDoc } from "@/lib/databaseFunctions";

interface DialogProps {
  doc: { id: string; document_name: string };
  setReloadData: (data: any) => void;
}

export function DialogDeleteDocsApproval({ doc, setReloadData }: DialogProps) {
  const handleClicDelete = async () => {
    await deleteDoc(doc.document_name);
    await deleteDocsApproval(doc.id);
    setReloadData(true);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="hover:bg-[#FF666618]" variant="outline" size="icon">
          <Trash2 className="text-red-700" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente los
            datos incluyendo los documentos y comentarios relacionados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClicDelete}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
