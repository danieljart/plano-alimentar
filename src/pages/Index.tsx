import { useEffect, useMemo, useState } from "react";
import { ScrollTabs, ScrollTabsList, ScrollTabsTrigger, ScrollTabsContent } from "@/components/ui/scroll-tabs";
import { MealAccordion, MealAccordionItem, MealAccordionTrigger, MealAccordionContent } from "@/components/ui/meal-accordion";
import { Button } from "@/components/ui/button";
import { CalorieBadge } from "@/components/nutrition/CalorieBadge";
import { NutritionChart } from "@/components/nutrition/NutritionChart";
import { AuthPage } from "@/components/auth/AuthPage";
import { PreferencesOnboarding } from "@/components/preferences/PreferencesOnboarding";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuth, AuthProvider } from "@/hooks/useAuth";
import { DayPlan, WEEK_PLAN, MEAL_OPTIONS, MealType, getMealTitle } from "@/data/plan";
import { getMealNutrition, calculateMealNutrition } from "@/data/nutrition";
import { cn } from "@/lib/utils";

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
  const nutrition = getMealNutrition(selected.id);

  return (
    <MealAccordionItem value={mealType}>
      <MealAccordionTrigger>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-semibold text-left">{getMealTitle(mealType)}</h3>
              <p className="text-sm text-muted-foreground">{time}</p>
            </div>
          </div>
          <CalorieBadge calories={nutrition.calories} />
        </div>
      </MealAccordionTrigger>
      <MealAccordionContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Opção selecionada</h4>
            <ul className="space-y-1">
              {selected.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Alternativas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {options.map((opt) => (
                <Button
                  key={opt.id}
                  variant={opt.id === selected.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onChange(opt.id)}
                  className={cn(
                    "justify-start h-auto py-2 px-3",
                    opt.id === selected.id ? "shadow-lg" : ""
                  )}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </MealAccordionContent>
    </MealAccordionItem>
  );
}

const DayView: React.FC<{ day: DayPlan; openMeal: string; setOpenMeal: (meal: string) => void }> = ({ day, openMeal, setOpenMeal }) => {
  const [selection, setSelection] = useState<Record<MealType, string>>(() => ({
    breakfast: day.meals.breakfast.optionId,
    snack_morning: day.meals.snack_morning.optionId,
    lunch: day.meals.lunch.optionId,
    snack_afternoon: day.meals.snack_afternoon.optionId,
    dinner: day.meals.dinner.optionId,
    supper: day.meals.supper.optionId,
  }));

  const dayNutrition = useMemo(() => {
    const meals = Object.entries(selection).map(([type, optionId]) => getMealNutrition(optionId));
    return meals.reduce((total, meal) => ({
      calories: total.calories + meal.calories,
      protein: total.protein + meal.protein,
      carbs: total.carbs + meal.carbs,
      fat: total.fat + meal.fat,
      fiber: total.fiber + meal.fiber,
      sodium: total.sodium + meal.sodium,
      sugars: total.sugars + meal.sugars
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0, sugars: 0 });
  }, [selection]);

  return (
    <div className="space-y-6">
      {/* Daily Summary */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Resumo do Dia</h2>
            <div className="flex items-center gap-4">
              <CalorieBadge calories={dayNutrition.calories} className="text-lg px-4 py-2" />
              <div className="text-sm text-muted-foreground">
                Meta: 1500 kcal
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Distribuição de Macros</h3>
            <NutritionChart nutrition={dayNutrition} className="h-32" />
          </div>
        </div>
      </div>

      {/* Meals */}
      <MealAccordion value={openMeal} onValueChange={setOpenMeal}>
        <MealCard mealType="breakfast" time={day.meals.breakfast.time} optionId={selection.breakfast} onChange={(id)=>setSelection(s=>({...s, breakfast:id}))} />
        <MealCard mealType="snack_morning" time={day.meals.snack_morning.time} optionId={selection.snack_morning} onChange={(id)=>setSelection(s=>({...s, snack_morning:id}))} />
        <MealCard mealType="lunch" time={day.meals.lunch.time} optionId={selection.lunch} onChange={(id)=>setSelection(s=>({...s, lunch:id}))} />
        <MealCard mealType="snack_afternoon" time={day.meals.snack_afternoon.time} optionId={selection.snack_afternoon} onChange={(id)=>setSelection(s=>({...s, snack_afternoon:id}))} />
        <MealCard mealType="dinner" time={day.meals.dinner.time} optionId={selection.dinner} onChange={(id)=>setSelection(s=>({...s, dinner:id}))} />
        <MealCard mealType="supper" time={day.meals.supper.time} optionId={selection.supper} onChange={(id)=>setSelection(s=>({...s, supper:id}))} />
      </MealAccordion>
    </div>
  );
};

function AppContent() {
  const { user, profile, loading } = useAuth();
  const [openMeal, setOpenMeal] = useState<string>("");

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  if (!user) {
    return <AuthPage onAuthSuccess={() => {}} />;
  }

  if (profile && !profile.preferences_completed) {
    return <PreferencesOnboarding onComplete={() => window.location.reload()} />;
  }

  const canonical = typeof window !== 'undefined' ? window.location.href : undefined;
  
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <SEO title="Plano alimentar 1500 kcal • Variações por dia" description="Plano alimentar semanal 1500 kcal com variações, horários ajustados e alternativas por refeição." canonical={canonical} />
      
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gradient">Plano Alimentar</h1>
              <p className="text-sm text-muted-foreground">1500 kcal • Personalizado</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              Imprimir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <ScrollTabs defaultValue={WEEK_PLAN[0].id}>
          <ScrollTabsList>
            {WEEK_PLAN.map((day) => (
              <ScrollTabsTrigger key={day.id} value={day.id}>
                {day.label}
              </ScrollTabsTrigger>
            ))}
          </ScrollTabsList>
          
          {WEEK_PLAN.map((day) => (
            <ScrollTabsContent key={day.id} value={day.id}>
              <DayView day={day} openMeal={openMeal} setOpenMeal={setOpenMeal} />
            </ScrollTabsContent>
          ))}
        </ScrollTabs>
      </main>
    </div>
  );
}

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
