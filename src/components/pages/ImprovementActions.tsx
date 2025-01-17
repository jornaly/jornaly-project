import { useEffect, useState } from "react";
import { Types, columns } from "../tables/improvement-actions/columns";
import { ImprovementTable } from "../tables/improvement-actions/data-table";
import { getAllImprovements } from "@/lib/databaseFunctions";
import { FormImprovements } from "../dialogs/improvement-actions/FormImprovemts";

export function ImprovementActions() {
  const [dataImprovements, setDataImprovements] = useState<Types[]>([]);
  const [reloadData, setReloadData] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const data = await getAllImprovements();
      if (data) {
        setDataImprovements(data);
      }
    };
    getData();
    setReloadData(false);
  }, [reloadData]);
  return (
    <main className="container mx-auto">
      <h1 className="mb-5 text-2xl montserrat-bold montserrat-bold">
        Acciones de mejora
      </h1>
      <FormImprovements mode="new" setReloadData={setReloadData} />
      <ImprovementTable
        columns={columns(setReloadData)}
        data={dataImprovements}
      />
    </main>
  );
}
