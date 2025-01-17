import { useState, useEffect } from "react";
import { ComboboxProjects } from "./Combobox";
import { DashboardTable } from "./tables/dashboard/data-table";
import { Tasks, columns } from "./tables/dashboard/columns";
import { NewProject } from "./dialogs/projects/NewProject";
import { getAllProjects } from "@/lib/databaseFunctions";
import { FormTask } from "./dialogs/tasks/FormTask";
import { getTasksByProject } from "@/lib/databaseFunctions";
import { CalendarPage } from "./Calendar";

export function Dashboard() {
  const [dataProjects, setDataProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [dataTasks, setDataTasks] = useState<Tasks[]>([]);
  const [dateSelected, setDateSelected] = useState("");

  useEffect(() => {
    const getData = async () => {
      await getAllProjects(setDataProjects);
    };
    getData();
  }, []);

  useEffect(() => {
    if (dataProjects && dataProjects.length > 0) {
      getTasksByProject(selectedProjectId, setDataTasks);
    }
  }, [selectedProjectId]);

  return (
    <main className="container mx-auto">
      <h1 className="mb-5 text-2xl montserrat-bold">Mis tareas</h1>
      <div className="flex mb-10">
        <ComboboxProjects
          projects={dataProjects}
          setDataProjects={setDataProjects}
          setSelectedProjectId={setSelectedProjectId}
        />
        <NewProject setDataProjects={setDataProjects} />
      </div>

      {dataProjects.length > 0 ? (
        <div className="flex justify-between gap-5">
          <div className="w-full">
            <FormTask
              mode="new"
              id_project={selectedProjectId}
              setDataTasks={setDataTasks}
            />
            <DashboardTable
              columns={columns(setDataTasks)}
              data={dataTasks}
              dateSelected={dateSelected}
              setDateSelected={setDateSelected}
            />
          </div>
          <div>
            <CalendarPage data={dataTasks} setDateSelected={setDateSelected} />
          </div>
        </div>
      ) : (
        <p className="text-center">
          Crea un proyecto para agregar nuevas tareas.
        </p>
      )}
    </main>
  );
}
