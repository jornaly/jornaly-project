import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { docsItems } from "@/lib/sidebarItems";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";
import { ChevronDown, RotateCw } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getAllDocs } from "@/lib/databaseFunctions";

interface Docs {
  id: string;
  name: string;
}

export function DocsSidebar() {
  const [dataDocs, setDataDocs] = useState<Docs[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Docs[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [spinButton, setSpinButton] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllDocs();
      setDataDocs(data ?? []);
      setFilteredDocs(data ?? []);
    };
    getData();
  }, []);

  const reloadDocs = async () => {
    setSpinButton(true);
    const data = await getAllDocs();
    setDataDocs(data ?? []);
    setFilteredDocs(data ?? []);
    setSearchQuery("");
    setSpinButton(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    setFilteredDocs(
      dataDocs.filter((doc) => doc.name.toLowerCase().includes(lowerCaseQuery))
    );
  };

  return (
    <Sidebar>
      <SidebarContent className="mt-16">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link to="/">
              <span className="hover:underline">Jornaly</span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen={false} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      Todos los documentos
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem className="mb-5 flex w-full max-w-sm items-center space-x-2">
                        <Input
                          placeholder="Buscar..."
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={reloadDocs}
                        >
                          <RotateCw
                            className={spinButton ? "animate-spin" : ""}
                          />
                        </Button>
                      </SidebarMenuSubItem>
                      {filteredDocs.map((item) => (
                        <SidebarMenuSubItem
                          key={item.id}
                          className="first-letter:capitalize"
                        >
                          <a
                            href={`https://emgcxawtmiaezugrqzuk.supabase.co/storage/v1/object/public/documents/${item.name}`}
                            target="_blank"
                          >
                            {item.name}
                          </a>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              {docsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
