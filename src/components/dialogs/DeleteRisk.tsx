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
import { deleteRisk } from "@/lib/databaseFunctions";

interface DialogProps {
  id: string;
  setReloadData: (data: any) => void;
}

export function DialogDeleteRisk({ id, setReloadData }: DialogProps) {
  const handleClicDelete = async () => {
    await deleteRisk(id);
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
            datos.
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
