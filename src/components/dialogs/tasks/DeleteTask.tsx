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
import { deleteTask } from "@/lib/databaseFunctions";

interface DialogProps {
  task: { id: string; project_id: string };
  setTasks: (data: any) => void;
}

export function DialogDeleteTask({ task, setTasks }: DialogProps) {
  const handleClicDelete = async () => {
    await deleteTask(task.id, task.project_id, setTasks);
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
            Esta acción no se puede deshacer. Esto eliminará permanentemente la
            tarea y todos sus comentarios.
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
