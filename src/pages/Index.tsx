import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DayPlan, WEEK_PLAN, MEAL_OPTIONS, MealType, getMealTitle } from "@/data/plan";

const SEO: React.FC<{ title: string; description: string; canonical?: string }> = ({ title, description, canonical }) => {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector("meta[name=description]") || document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", description);
    if (!meta.parentNode) document.head.appendChild(meta);

    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
  }, [title, description, canonical]);
  return null;
};

function MealCard({
  mealType,
  time,
  optionId,
  onChange,
}: {
  mealType: MealType;
  time: string;
  optionId: string;
  onChange: (newId: string) => void;
}) {
  const options = MEAL_OPTIONS[mealType];
  const selected = useMemo(() => options.find(o => o.id === optionId) || options[0], [options, optionId]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between">
          <span>{getMealTitle(mealType)}</span>
          <span className="text-sm font-normal text-muted-foreground">{time}</span>
        </CardTitle>
        <CardDescription>Escolha uma alternativa caso não tenha algum item.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="font-medium">Opção selecionada</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
              {selected.items.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <label className="text-sm font-medium">Alternativas:</label>
            <div className="inline-flex flex-wrap gap-2">
              {options.map((opt) => (
                <Button
                  key={opt.id}
                  variant={opt.id === selected.id ? "default" : "secondary"}
                  size="sm"
                  onClick={() => onChange(opt.id)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const DayView: React.FC<{ day: DayPlan }> = ({ day }) => {
  const [selection, setSelection] = useState<Record<MealType, string>>(() => ({
    breakfast: day.meals.breakfast.optionId,
    snack_morning: day.meals.snack_morning.optionId,
    lunch: day.meals.lunch.optionId,
    snack_afternoon: day.meals.snack_afternoon.optionId,
    dinner: day.meals.dinner.optionId,
    supper: day.meals.supper.optionId,
  }));

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MealCard mealType="breakfast" time={day.meals.breakfast.time} optionId={selection.breakfast} onChange={(id)=>setSelection(s=>({...s, breakfast:id}))} />
        <MealCard mealType="snack_morning" time={day.meals.snack_morning.time} optionId={selection.snack_morning} onChange={(id)=>setSelection(s=>({...s, snack_morning:id}))} />
        <MealCard mealType="lunch" time={day.meals.lunch.time} optionId={selection.lunch} onChange={(id)=>setSelection(s=>({...s, lunch:id}))} />
        <MealCard mealType="snack_afternoon" time={day.meals.snack_afternoon.time} optionId={selection.snack_afternoon} onChange={(id)=>setSelection(s=>({...s, snack_afternoon:id}))} />
        <MealCard mealType="dinner" time={day.meals.dinner.time} optionId={selection.dinner} onChange={(id)=>setSelection(s=>({...s, dinner:id}))} />
        <MealCard mealType="supper" time={day.meals.supper.time} optionId={selection.supper} onChange={(id)=>setSelection(s=>({...s, supper:id}))} />
      </div>
    </section>
  );
};

const Index = () => {
  const canonical = typeof window !== 'undefined' ? window.location.href : undefined;
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Plano alimentar 1500 kcal • Variações por dia" description="Plano alimentar semanal 1500 kcal com variações, horários ajustados e alternativas por refeição." canonical={canonical} />
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Plano alimentar 1500 kcal</h1>
            <p className="text-muted-foreground">Sem repetições em dias consecutivos • Almoço no intervalo ou antes do trabalho</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => window.print()}>Imprimir / Salvar PDF</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <Tabs defaultValue={WEEK_PLAN[0].id} className="w-full">
          <TabsList className="w-full flex flex-wrap gap-2 justify-start">
            {WEEK_PLAN.map((d) => (
              <TabsTrigger key={d.id} value={d.id}>{d.label}</TabsTrigger>
            ))}
          </TabsList>
          {WEEK_PLAN.map((d) => (
            <TabsContent key={d.id} value={d.id}>
              <DayView day={d} />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
