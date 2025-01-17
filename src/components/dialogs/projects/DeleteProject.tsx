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
import { deleteProject } from "@/lib/databaseFunctions";

interface DialogProps {
  setDataProjects: (data: any) => void;
  id: string;
}

export function DialogDeleteProject({ setDataProjects, id }: DialogProps) {
  const handleOpenDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const handleClicCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const handleClicDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteProject(id, setDataProjects);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="hover:bg-[#FF666618]"
          variant="outline"
          size="icon"
          onClick={handleOpenDialog}
        >
          <Trash2 className="text-red-700" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente tu
            proyecto y todas las tareas asignadas a él.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClicCancel}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleClicDelete}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
