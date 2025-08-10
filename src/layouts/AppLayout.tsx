import { Link } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="h-14 flex items-center border-b bg-card/80 backdrop-blur-sm px-3 sm:px-6 sticky top-0 z-50">
            <SidebarTrigger className="mr-2" />
            <Link to="/" className="text-lg font-bold text-gradient" aria-label="Voltar ao plano alimentar">
              Plano Alimentar
            </Link>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
