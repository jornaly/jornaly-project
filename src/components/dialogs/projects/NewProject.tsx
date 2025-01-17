import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { insertProject } from "@/lib/databaseFunctions";
import { getAllProjects } from "@/lib/databaseFunctions";

interface NewProjectProps {
  setDataProjects: (data: any) => void;
}

export function NewProject({ setDataProjects }: NewProjectProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, name: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await insertProject(data);
    setData({ name: "" });
    setOpen(false);
    getAllProjects(setDataProjects);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-5" asChild>
        <Button>Nuevo proyecto</Button>
      </DialogTrigger>
      <form onSubmit={handleSubmit}></form>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo proyecto</DialogTitle>
          <DialogDescription>
            Agrega el nombre de tu proyecto aquí, haga clic en guardar cuando
            haya terminado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-2 mb-4">
            <label htmlFor="name">Nombre:</label>
            <Input id="name" onChange={handleChange} required />
          </div>
          <DialogFooter>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
