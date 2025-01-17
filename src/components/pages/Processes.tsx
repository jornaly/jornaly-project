import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";

export function Processes() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container mx-auto">
        <SidebarTrigger />
        <h1 className="mb-5 text-2xl montserrat-bold">Procesos</h1>
      </main>
    </SidebarProvider>
  );
}
