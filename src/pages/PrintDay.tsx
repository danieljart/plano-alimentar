import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { WEEK_PLAN, MealType, getMealTitle, MEAL_OPTIONS } from "@/data/plan";
import { Button } from "@/components/ui/button";
import { CalorieBadge } from "@/components/nutrition/CalorieBadge";
import { getMealNutrition } from "@/data/nutrition";

export default function PrintDay() {
  const params = useParams();
  const stored = typeof window !== "undefined" ? localStorage.getItem("selectedDayId") : null;
  const dayId = params.day || stored || WEEK_PLAN[0].id;

  const day = useMemo(() => WEEK_PLAN.find(d => d.id === dayId) || WEEK_PLAN[0], [dayId]);

  useEffect(() => {
    document.title = `Impressão • ${day.label}`;
    const meta = document.querySelector("meta[name=description]") || document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", `Versão para impressão do plano alimentar de ${day.label}.`);
    if (!meta.parentNode) document.head.appendChild(meta);
  }, [day.label]);

  return (
    <div className="container mx-auto px-4 py-6">
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 10mm; }
          .no-print { display: none !important; }
          body { background: white; }
          .print-card { box-shadow: none !important; border: 1px solid hsl(var(--border)); }
        }
      `}</style>

      <div className="no-print mb-4 flex justify-end">
        <Button variant="outline" onClick={() => window.print()}>Imprimir</Button>
      </div>

      <article className="print-card bg-card rounded-xl p-6">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Plano do dia — {day.label}</h1>
          <p className="text-sm text-muted-foreground">Formato lista • 1 página (paisagem)</p>
        </header>

        <ul className="space-y-3">
          {(["breakfast","snack_morning","lunch","snack_afternoon","dinner","supper"] as MealType[]).map((type) => {
            const slot = day.meals[type];
            const opt = MEAL_OPTIONS[type].find(o => o.id === slot.optionId) || MEAL_OPTIONS[type][0];
            const nutrition = getMealNutrition(opt.id);
            return (
              <li key={type} className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{getMealTitle(type)}</div>
                    <div className="text-xs text-muted-foreground">{slot.time}</div>
                  </div>
                  <CalorieBadge calories={nutrition.calories} />
                </div>
                <ul className="mt-2 space-y-1 ml-4">
                  {opt.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </article>
    </div>
  );
}
