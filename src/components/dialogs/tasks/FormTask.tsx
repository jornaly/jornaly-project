import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { insertTask, updateTask } from "@/lib/databaseFunctions";
import { getTasksByProject } from "@/lib/databaseFunctions";

interface Props {
  mode: string;
  id_project?: string;
  setDataTasks: (data: any) => void;
  task?: {
    id: string;
    task: string;
    responsible: string;
    state: string;
    expiration: string;
    priority: string;
    project_id: string;
  };
}

export function FormTask({ mode, id_project, setDataTasks, task }: Props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    task: "",
    responsible: "",
    state: "",
    expiration: "",
    priority: "",
    project_id: "",
  });

  useEffect(() => {
    if (mode === "new") {
      setData((prevData) => ({
        ...prevData,
        project_id: id_project || "",
      }));
    } else if (task) {
      setData(task);
    }
  }, [id_project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "new") {
      await insertTask(data);
      setData({
        task: "",
        responsible: "",
        state: "",
        expiration: "",
        priority: "",
        project_id: id_project || "",
      });
      setOpen(false);
      getTasksByProject(id_project || "", setDataTasks);
    } else {
      await updateTask(data);
      setData({
        task: "",
        responsible: "",
        state: "",
        expiration: "",
        priority: "",
        project_id: "",
      });
      setOpen(false);
      getTasksByProject(data.project_id, setDataTasks);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "new" ? (
          <Button>Nueva tarea</Button>
        ) : (
          <Button variant="outline" size="icon">
            <Pencil />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "new" ? "Nueva tarea" : "Actualizar tarea"}
          </DialogTitle>
          <DialogDescription>
            {mode === "new"
              ? "Agrega una nueva tarea aquí, haga clic en guardar cuando haya terminado."
              : "Modifica los datos de tu tarea aquí, haga clic en actualizar cuando haya terminado."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-2 mb-4">
            <div className="mb-3">
              <label htmlFor="task">Tarea:</label>
              <Input
                id="task"
                name="task"
                onChange={handleChange}
                value={data.task}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="responsible">Responsable:</label>
              <Input
                id="responsible"
                name="responsible"
                onChange={handleChange}
                value={data.responsible}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="state">Estado:</label>
              <Select
                value={data.state}
                onValueChange={(value) => {
                  setData((prevData) => ({
                    ...prevData,
                    state: value,
                  }));
                }}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ready">Listo</SelectItem>
                  <SelectItem value="in_progress">En curso</SelectItem>
                  <SelectItem value="stopped">Detenido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-3">
              <label htmlFor="expiration">Vence:</label>
              <Input
                type="date"
                id="expiration"
                name="expiration"
                onChange={handleChange}
                value={data.expiration}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="priority">Prioridad:</label>
              <Select
                value={data.priority}
                onValueChange={(value) => {
                  setData((prevData) => ({
                    ...prevData,
                    priority: value,
                  }));
                }}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="important">Importante</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {mode === "new" ? "Guardar" : "Actualizar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
