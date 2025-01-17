import { useEffect, useState } from "react";
import { DocsTable } from "../tables/docs-approval/data-table";
import { columns, Types } from "../tables/docs-approval/columns";
import { FormDocs } from "../dialogs/docs-approval/FormDocs";
import { getAllDocsApproval } from "@/lib/databaseFunctions";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { DocsSidebar } from "../docs-sidebar";

export function DocsApproval() {
  const [reloadData, setReloadData] = useState(false);
  const [dataDocs, setDataDocs] = useState<Types[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllDocsApproval();
      if (data) {
        setDataDocs(data);
      }
    };
    getData();
    setReloadData(false);
  }, [reloadData]);
  return (
    <SidebarProvider>
      <DocsSidebar />
      <main className="container mx-auto">
        <SidebarTrigger />
        <h1 className="mb-5 text-2xl montserrat-bold">
          Aprobación de documentos
        </h1>
        <FormDocs mode="new" setReloadData={setReloadData} />
        <DocsTable columns={columns(setReloadData)} data={dataDocs} />
      </main>
    </SidebarProvider>
  );
}
