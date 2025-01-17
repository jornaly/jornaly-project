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
import { Input } from "@/components/ui/input";
import {
  insertImprovement,
  updateImprovent,
  insertTask,
  getAllProjects,
} from "@/lib/databaseFunctions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  mode: string;
  setReloadData: (data: any) => void;
  improvement_action?: {
    id: string;
    process_name: string;
    improvement_actions: string;
    responsible: string;
    expected_date: string;
    completed_date: string;
  };
}

export function FormImprovements({
  mode,
  setReloadData,
  improvement_action,
}: Props) {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [data, setData] = useState({
    process_name: "",
    improvement_actions: "",
    responsible: "",
    expected_date: "",
    completed_date: "",
  });
  const [task, setTask] = useState({
    task: "",
    responsible: "",
    state: "in_progress",
    expiration: "",
    priority: "important",
    project_id: "",
  });

  useEffect(() => {
    const getProjects = async () => {
      await getAllProjects(setProjects);
    };
    if (mode === "new") {
      setData((prevData) => ({
        ...prevData,
      }));
    } else if (improvement_action) {
      setData(improvement_action);
    }
    getProjects();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataTask = {
      ...task,
      task: `Mejora de procesos "${data.process_name}"`,
      responsible: data.responsible,
      expiration: data.expected_date,
    };
    if (mode === "new") {
      await insertImprovement(data);
      await insertTask(dataTask);
      setData({
        process_name: "",
        improvement_actions: "",
        responsible: "",
        expected_date: "",
        completed_date: "",
      });
      setOpen(false);
      setReloadData(true);
    } else {
      await updateImprovent(data);
      setData({
        process_name: "",
        improvement_actions: "",
        responsible: "",
        expected_date: "",
        completed_date: "",
      });
      setOpen(false);
      setReloadData(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "new" ? (
          <Button className="mb-5">Nueva acción de mejora</Button>
        ) : (
          <Button variant="outline" size="icon">
            <Pencil />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "new"
              ? "Nueva acción de mejora"
              : "Actualizar acción de mejora"}
          </DialogTitle>
          <DialogDescription>
            {mode === "new"
              ? "Agrega una nueva acción de mejora aquí, haga clic en guardar cuando haya terminado."
              : "Modifica los datos de tu acción de mejora aquí, haga clic en actualizar cuando haya terminado."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-2 mb-4">
            <div className="mb-3">
              <label htmlFor="process_name">Nombre del proceso:</label>
              <Input
                id="process_name"
                name="process_name"
                onChange={handleChange}
                value={data.process_name}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="improvement_actions">Acciones de mejora:</label>
              <Input
                id="improvement_actions"
                name="improvement_actions"
                onChange={handleChange}
                value={data.improvement_actions}
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
              <label htmlFor="expected_date">Fecha prevista:</label>
              <Input
                type="date"
                id="expected_date"
                name="expected_date"
                onChange={handleChange}
                value={data.expected_date}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="completed_date">Fecha completada:</label>
              <Input
                type="date"
                id="completed_date"
                name="completed_date"
                onChange={handleChange}
                value={data.completed_date}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="state">Proyecto:</label>
              <Select
                onValueChange={(value) => {
                  setTask((prevData) => ({
                    ...prevData,
                    project_id: value,
                  }));
                }}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un proyecto" />
                </SelectTrigger>
                <SelectContent>
                  {projects?.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
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
