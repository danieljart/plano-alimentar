import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { profile } = useAuth();

  useEffect(() => {
    document.title = "Perfil • Plano Alimentar";
    const meta = document.querySelector("meta[name=description]") || document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", "Gerencie seu perfil e configurações do plano alimentar.");
    if (!meta.parentNode) document.head.appendChild(meta);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <section className="max-w-xl mx-auto card-enhanced p-6">
        <h1 className="text-xl font-semibold mb-4">Perfil</h1>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Nome</label>
            <Input value={profile?.name || ""} readOnly className="mt-1" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <Input value={profile?.email || ""} readOnly className="mt-1" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Meta calórica diária (kcal)</label>
            <Input value={profile?.daily_calorie_target ?? 1500} readOnly className="mt-1" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">API Key do Google Gemini</label>
            <Input type="password" placeholder="Insira sua API Key" className="mt-1" />
            <p className="text-xs text-muted-foreground mt-1">Apenas a UI por enquanto.</p>
          </div>
          <div className="pt-2">
            <Button disabled>Salvar alterações</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
