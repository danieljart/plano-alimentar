import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LogOut, User, Settings2, Printer } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    cn(isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/60");

  const handlePrint = () => {
    const selectedDayId = localStorage.getItem("selectedDayId") || "monday";
    navigate(`/print/${selectedDayId}`);
  };

  return (
    <Sidebar className="data-[variant=sidebar]:w-60" collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Perfil">
                  <NavLink to="/profile" className={linkCls}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Preferências Alimentares">
                  <NavLink to="/preferences" className={linkCls}>
                    <Settings2 className="mr-2 h-4 w-4" />
                    <span>Preferências Alimentares</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handlePrint} tooltip="Imprimir o plano do dia">
                  <Printer className="mr-2 h-4 w-4" />
                  <span>Imprimir o plano do dia</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {!isHome && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Voltar ao plano alimentar">
                    <NavLink to="/" className={linkCls}>
                      <span>Voltar ao plano alimentar</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={signOut} tooltip="Sair">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
