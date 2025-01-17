import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DialogDeleteProject } from "./dialogs/projects/DeleteProject";

interface Project {
  id: string;
  name: string;
}

interface ComboProps {
  projects: Project[];
  setDataProjects: (data: any) => void;
  setSelectedProjectId: (data: any) => void;
}

export function ComboboxProjects({
  projects,
  setDataProjects,
  setSelectedProjectId,
}: ComboProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const getData = async () => {
      const project_id = localStorage.getItem("project_id");
      if (projects && projects.length > 0) {
        const selectedProject = projects.find(
          (project) => project.id === project_id
        );
        if (selectedProject) {
          setValue(selectedProject.name);
          setSelectedProjectId(selectedProject.id);
        } else {
          setValue(projects[0]?.name);
          setSelectedProjectId(projects[0]?.id);
          localStorage.setItem("project_id", projects[0]?.id);
        }
      }
    };
    getData();
  }, [projects]);

  const handleSelect = (data: Project) => {
    const project_id = data.name === value ? data.id : data.id;
    setValue(data.name);
    localStorage.setItem("project_id", project_id);
    const selectedProject = projects.find(
      (project) => project.name === data.name
    );
    if (selectedProject) {
      setSelectedProjectId(selectedProject.id);
    } else {
      setSelectedProjectId("");
    }
    setOpen(false);
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="first-letter:capitalize w-full justify-between"
          >
            {value
              ? projects.find((project) => project.name === value)?.name
              : "Seleciona un proyecto..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="w-full">
            <CommandInput placeholder="Buscar proyecto..." className="h-9" />
            <CommandList>
              <CommandEmpty>Proyecto no encontrado.</CommandEmpty>
              <CommandGroup>
                {projects.map((project) => (
                  <CommandItem
                    className="first-letter:capitalize"
                    key={project.id}
                    value={project.name}
                    onSelect={() => handleSelect(project)}
                  >
                    {project.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === project.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <DialogDeleteProject
                      setDataProjects={setDataProjects}
                      id={project.id}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
