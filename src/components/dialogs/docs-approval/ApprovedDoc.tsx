import { ArrowRight } from "lucide-react";
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
import { updateDocsApproval } from "@/lib/databaseFunctions";

interface DialogProps {
  doc: { state: {} };
  setReloadData: (data: any) => void;
}

export function DialogApprovedDoc({ doc, setReloadData }: DialogProps) {
  const handleClicApproved = async () => {
    await updateDocsApproval({
      ...doc,
      state: { ...doc.state, approval: new Date() },
    });
    setReloadData(true);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          Aprobar <ArrowRight />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto aprobará los documentos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClicApproved}>
            Aprobar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
