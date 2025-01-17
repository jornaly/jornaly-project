import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";
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
import { insertCommentDoc, getCommentsByDoc } from "@/lib/databaseFunctions";
import { DialogDeleteCommentDoc } from "./DeleteCommentDoc";

interface CommentsProps {
  id: string;
}

interface Comments {
  id: string;
  comment: string;
  created_at: string;
}

export function DocsComments({ id }: CommentsProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ comment: "", docs_id: "" });
  const [comments, setComments] = useState<Comments[]>([]);
  const [reloadData, setReloadData] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      setData((prevData) => ({
        ...prevData,
        docs_id: id,
      }));
    }
  }, [id]);

  useEffect(() => {
    const getComments = async () => {
      const data = await getCommentsByDoc(id);
      if (data) {
        setComments(data);
      }
    };
    getComments();
    setReloadData(false);
  }, [reloadData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, comment: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await insertCommentDoc(data);
    setData({ comment: "", docs_id: id });
    inputRef.current?.focus();
    setReloadData(true);
  };

  const transformDateTime = (dateTimeUTC: string) => {
    const date = new Date(dateTimeUTC);
    const optionsDate = { day: "numeric" as const, month: "long" as const };
    const optionsHour = {
      hour: "2-digit" as const,
      minute: "2-digit" as const,
      timeZone: "America/Mexico_City",
      hour12: true,
    };
    const formattedDate = date.toLocaleDateString("es-ES", optionsDate);
    const formattedHour = date.toLocaleTimeString("es-ES", optionsHour);

    return `${formattedDate} a las ${formattedHour}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <MessageSquareText />
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Comentarios</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {comments.length > 0 ? (
          <ol className="relative border-s border-gray-200">
            {comments.map((comment) => (
              <li className="ms-4" key={comment.id}>
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                  {transformDateTime(comment.created_at)}
                </time>
                <div className="flex items-center justify-between">
                  <p className=" text-base font-normal">{comment.comment}</p>
                  <DialogDeleteCommentDoc
                    id={comment.id}
                    setReloadData={setReloadData}
                  />
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-center">
            Aún no hay comentarios, puedes agregar uno nuevo en la parte de
            abajo.
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="py-2 mb-4 mt-10">
            <label htmlFor="comment">Comentario:</label>
            <Input
              ref={inputRef}
              id="comment"
              value={data.comment}
              onChange={handleChange}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
