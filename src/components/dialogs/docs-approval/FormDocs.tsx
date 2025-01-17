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
import {
  insertDocsApproval,
  updateDocsApproval,
} from "@/lib/databaseFunctions";

interface Props {
  mode: string;
  setReloadData: (data: any) => void;
  docs_approval?: {
    id: string;
    phase: string;
    completed_date: string;
    responsible: string;
    state: {
      development: string;
      review: string;
      approval: string;
    };
  };
}

export function FormDocs({ mode, setReloadData, docs_approval }: Props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    phase: "",
    completed_date: "",
    responsible: "",
    state: {
      development: "",
      review: "",
      approval: "",
    },
  });

  useEffect(() => {
    if (mode === "new") {
      setData((prevData) => ({
        ...prevData,
      }));
    } else if (docs_approval) {
      setData(docs_approval);
    }
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
    const newData = {
      ...data,
      state: {
        development: new Date(),
        review: "",
        approval: "",
      },
    };
    if (mode === "new") {
      await insertDocsApproval(newData);
      setData({
        phase: "",
        completed_date: "",
        responsible: "",
        state: {
          development: "",
          review: "",
          approval: "",
        },
      });
      setOpen(false);
      setReloadData(true);
    } else {
      await updateDocsApproval(data);
      setData({
        phase: "",
        completed_date: "",
        responsible: "",
        state: {
          development: "",
          review: "",
          approval: "",
        },
      });
      setOpen(false);
      setReloadData(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "new" ? (
          <Button className="mb-5">Nuevo documento</Button>
        ) : (
          <Button variant="outline" size="icon">
            <Pencil />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "new" ? "Nuevo documento" : "Actualizar documento"}
          </DialogTitle>
          <DialogDescription>
            {mode === "new"
              ? "Agrega una nueva aprobación de documentos aquí, haga clic en guardar cuando haya terminado."
              : "Modifica los datos de tu aprobación de documentos aquí, haga clic en actualizar cuando haya terminado."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-2 mb-4">
            <div className="mb-3">
              <label htmlFor="phase">Fase:</label>
              <Select
                value={data.phase}
                onValueChange={(value) => {
                  setData((prevData) => ({
                    ...prevData,
                    phase: value,
                  }));
                }}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Elaboración</SelectItem>
                  <SelectItem value="review">Revisión</SelectItem>
                  <SelectItem value="approval">Aprovación</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-3">
              <label htmlFor="completed_date">Fecha completada:</label>
              <Input
                id="completed_date"
                name="completed_date"
                onChange={handleChange}
                value={data.completed_date}
                type="date"
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
