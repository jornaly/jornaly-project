import { TableRisks } from "./TableRisks";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export function Risks() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container mx-auto">
        <SidebarTrigger />
        <h1 className="mb-5 text-2xl montserrat-bold">Riesgos</h1>
        <TableRisks />
      </main>
    </SidebarProvider>
  );
}
