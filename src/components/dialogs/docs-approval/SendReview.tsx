import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
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
  updateDocsApproval,
  getAllProjects,
  insertTask,
  uploadDoc,
  insertDoc,
} from "@/lib/databaseFunctions";

interface Props {
  setReloadData: (data: any) => void;
  docs_approval: {
    id: string;
    phase: string;
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
}

export function SendReview({ setReloadData, docs_approval }: Props) {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dataFile, setDataFile] = useState({ name: "", doc_id: "" });
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [data, setData] = useState({
    phase: "",
    completed_date: "",
    responsible: "",
    state: {
      development: "",
      review: "",
      approval: "",
    },
    reviewers: "",
    document_name: "",
  });
  const [task, setTask] = useState({
    task: "",
    responsible: "",
    state: "",
    expiration: "",
    priority: "important",
    project_id: "",
  });

  useEffect(() => {
    if (docs_approval) {
      setData(docs_approval);
    }
    const getProjects = async () => {
      await getAllProjects(setProjects);
      if (docs_approval) {
        setData(docs_approval);
        setTask({
          task: "",
          responsible: docs_approval.responsible,
          state: "in_progress",
          expiration: new Date(
            new Date(docs_approval.completed_date).setDate(
              new Date(docs_approval.completed_date).getDate() + 5
            )
          )
            .toISOString()
            .split("T")[0],
          priority: "important",
          project_id: "",
        });
        setDataFile({ ...dataFile, doc_id: docs_approval.id });
      }
    };
    getProjects();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
      phase: "review",
    }));
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataFile({ ...dataFile, name: e.target.value });
    setData({ ...data, document_name: e.target.value });
    setTask({ ...task, task: `Revisión de documento "${e.target.value}"` });
  };

  const sendMail = () => {
    const mailto = `mailto:${data.reviewers}?subject=${encodeURIComponent(
      "Revisión y aprobación del documento asignado."
    )}&body=${encodeURIComponent(
      `Espero que este mensaje te encuentre bien. Te escribo para informarte que se te ha asignado la tarea de revisar el siguiente documento: "${dataFile.name}". El objetivo es verificar que el contenido sea correcto. Por favor, realiza las siguientes acciones: Si tienes alguna pregunta o necesitas apoyo durante la revisión, no dudes en contactarme. Gracias por tu atención y compromiso.`
    )}`;
    window.location.href = mailto;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData = {
      ...data,
      state: {
        ...data.state,
        review: new Date(),
      },
    };
    setIsLoadingButton(true);
    if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
      const file = fileInputRef.current.files[0];
      if (await uploadDoc(dataFile.name, file)) {
        await insertDoc(dataFile);
        fileInputRef.current.value = "";
        await updateDocsApproval(newData);
        await insertTask(task);
        sendMail();
        setData({
          phase: "",
          completed_date: "",
          responsible: "",
          state: {
            development: "",
            review: "",
            approval: "",
          },
          reviewers: "",
          document_name: "",
        });
        setIsLoadingButton(false);
        setOpen(false);
        setReloadData(true);
      } else {
        console.log("errrorr");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Enviar a revisión
          <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enviar a revision</DialogTitle>
          <DialogDescription>
            Envia a revision los documentos, agregue el correo electronico del
            revisor y de clic en enviar cuando haya terminado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-2 mb-4">
            <div className="mb-8">
              <label htmlFor="name">Nombre del archivo:</label>
              <Input
                className="mb-3"
                id="name"
                value={dataFile.name}
                onChange={handleChangeFile}
                required
              />
              <Input
                ref={fileInputRef}
                type="file"
                id="file"
                accept="application/pdf"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reviewers">Correo del revisor:</label>
              <Input
                id="reviewers"
                name="reviewers"
                onChange={handleChange}
                value={data.reviewers}
                type="email"
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
            {isLoadingButton ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Enviando
              </Button>
            ) : (
              <Button type="submit">Eniviar</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
