export type MealType =
  | "breakfast"
  | "snack_morning"
  | "lunch"
  | "snack_afternoon"
  | "dinner"
  | "supper";

export interface MealOption {
  id: string;
  label: string;
  items: string[];
}

export interface DayMealSlot {
  time: string;
  optionId: string;
}

export interface DayPlan {
  id: string;
  label: string;
  work?: { start?: string; end?: string; breakStart?: string; breakEnd?: string };
  gym?: { start: string; end: string } | null;
  meals: Record<MealType, DayMealSlot>;
}

export const getMealTitle = (t: MealType) => {
  switch (t) {
    case "breakfast":
      return "Café da manhã";
    case "snack_morning":
      return "Colação";
    case "lunch":
      return "Almoço";
    case "snack_afternoon":
      return "Lanche da tarde";
    case "dinner":
      return "Jantar";
    case "supper":
      return "Ceia";
  }
};

export const MEAL_OPTIONS: Record<MealType, MealOption[]> = {
  breakfast: [
    {
      id: "bf-cuscuz-ovos",
      label: "Cuscuz + ovos",
      items: [
        "4 col. sopa de cuscuz",
        "1 col. sobremesa de chia",
        "2 ovos",
        "1 fatia pequena de queijo minas frescal light",
        "Café (150 ml) com mínimo açúcar",
      ],
    },
    {
      id: "bf-tapioca-frango",
      label: "Tapioca + frango",
      items: [
        "2 col. sopa de goma para tapioca hidratada",
        "1 col. sobremesa de chia",
        "4 col. sopa de frango cozido/desfiado",
        "1 col. sopa de requeijão light",
        "Café sem açúcar",
      ],
    },
    {
      id: "bf-sanduiche-ovos",
      label: "Sanduíche integral",
      items: [
        "2 fatias de pão integral",
        "2 ovos ou frango desfiado",
        "Queijo minas ou requeijão light",
        "Café sem açúcar",
      ],
    },
    {
      id: "bf-bisnaguitos",
      label: "Bisnaguitos recheados",
      items: [
        "3 bisnaguitos integrais",
        "2 col. sobremesa de creme de ricota",
        "2 fatias pequenas de queijo minas",
      ],
    },
    {
      id: "bf-paoqueijo-frigideira",
      label: "Pão de queijo de frigideira + fruta",
      items: [
        "2 ovos + requeijão + queijo ralado (tipo panqueca)",
        "1 porção de fruta (100g mamão ou 115g melão ou 7 uvas)",
        "1 col. sopa de aveia + café sem açúcar",
      ],
    },
  ],
  snack_morning: [
    { id: "sm-banana", label: "Banana", items: ["1 banana média (75g)"] },
    { id: "sm-maca", label: "Maçã", items: ["1 maçã pequena"] },
    { id: "sm-uvas", label: "Uvas", items: ["12 uvas pequenas"] },
    { id: "sm-ameixa", label: "Ameixa", items: ["1 ameixa vermelha (70g)"] },
    { id: "sm-abacaxi", label: "Abacaxi", items: ["2 fatias pequenas de abacaxi (50g)"] },
    { id: "sm-melao", label: "Melão", items: ["115g de melão"] },
    { id: "sm-mamao", label: "Mamão", items: ["100g de mamão"] },
  ],
  lunch: [
    {
      id: "ln-principal",
      label: "Prato principal",
      items: [
        "Salada crua à vontade (≥3 tipos)",
        "80g frango cozido ou 70g patinho ou 120g peixe",
        "4 col. sopa de arroz branco ou cuscuz",
        "2 col. sopa de feijão (grãos)",
        "5 col. sopa de legumes no vapor",
        "1 col. sopa de farofa fit",
      ],
    },
    {
      id: "ln-macarrao-fit",
      label: "Macarronada fit",
      items: [
        "5 garfadas de macarrão integral cozido",
        "4 col. sopa de patinho moído ou 5 col. de frango",
        "1 fatia de queijo minas",
        "2 col. sopa de molho de tomate",
      ],
    },
    {
      id: "ln-arroz-couve-legumes",
      label: "Arroz + couve + legumes",
      items: [
        "3 col. de servir de couve cozida",
        "2 col. de servir de legumes no vapor",
        "3 col. sopa de arroz branco",
        "Frango ou carne (mesmas quantidades)",
      ],
    },
    {
      id: "ln-almondega-brocolis",
      label: "Almôndega + arroz de brócolis",
      items: [
        "5 col. sopa de patinho moído (almôndegas)",
        "Tempero a gosto (alho, cebola, aveia, etc.)",
        "2 col. sopa de arroz + 2 col. sopa de brócolis",
        "1 col. sobremesa de azeite de oliva",
      ],
    },
  ],
  snack_afternoon: [
    {
      id: "sa-paes-requeijao",
      label: "Pães integrais + queijo",
      items: [
        "2 pães integrais ou bisnaguinhas",
        "2 col. sopa de requeijão",
        "2 fatias pequenas de queijo minas",
        "1 col. chá de orégano seco",
      ],
    },
    {
      id: "sa-iogurte-tribos",
      label: "Iogurte + biscoito integral de cacau",
      items: [
        "1 potinho (120g) de iogurte proteico",
        "7 unidades de biscoito integral de cacau",
      ],
    },
    {
      id: "sa-banana-whey",
      label: "Banana com whey",
      items: [
        "2 bananas médias",
        "1 dosador de whey (sem marca)",
        "1 col. sopa de aveia ou 1 col. sobremesa de chia",
      ],
    },
    {
      id: "sa-shake",
      label: "Shake com polpa",
      items: [
        "2 bananas + 1 polpa (morango/acerola/goiaba) + 100ml água",
        "1 dosador de whey",
        "Bater com gelo",
      ],
    },
  ],
  dinner: [
    {
      id: "dn-cuscuz-proteina",
      label: "Cuscuz + proteína",
      items: [
        "4 col. sopa de cuscuz",
        "1 col. sobremesa de chia",
        "1 col. sopa de requeijão light",
        "4 col. sopa de patinho moído ou 5 col. sopa de frango",
      ],
    },
    {
      id: "dn-hamburguer-fit",
      label: "Hambúrguer fit",
      items: [
        "2 fatias de pão integral",
        "5 col. sopa de patinho moído",
        "2 col. sopa de molho de tomate + 1 fatia queijo minas",
        "Cebola refogada (1 col. sopa cheia)",
      ],
    },
    {
      id: "dn-pizza-frigideira",
      label: "Pizza de frigideira",
      items: [
        "1 unidade de pão folha integral (wrap)",
        "Frango ou carne + queijo + molho de tomate",
        "Temperos: orégano, tomate, etc.",
      ],
    },
    {
      id: "dn-brusqueta-suco",
      label: "Brusqueta + suco",
      items: [
        "3 fatias de pão integral",
        "2 col. sopa de molho de tomate",
        "2 fatias de queijo minas + orégano",
        "Suco natural (maracujá/goiaba/acerola) com 150ml água",
      ],
    },
  ],
  supper: [
    {
      id: "sp-iogurte-tribos",
      label: "Iogurte + biscoito integral",
      items: [
        "1 iogurte proteico (120g)",
        "4 unidades de biscoito integral de cacau",
      ],
    },
    {
      id: "sp-pipoca-pate",
      label: "Pipoca + patê de queijo",
      items: [
        "2 col. sopa de milho para pipoca",
        "Patê: 1 fatia de queijo minas + 1 col. sopa de requeijão",
      ],
    },
    {
      id: "sp-iogurte-castanhas",
      label: "Iogurte + castanhas",
      items: [
        "1 pote de iogurte proteico (170g) ou desnatado (150g)",
        "8 unidades de castanha de caju torrada sem sal",
      ],
    },
    {
      id: "sp-torrada-requeijao",
      label: "Torradas + requeijão",
      items: [
        "4 torradas integrais",
        "4 col. sobremesa de requeijão",
      ],
    },
  ],
};

export const WEEK_PLAN: DayPlan[] = [
  {
    id: "seg",
    label: "Segunda",
    work: { start: "09:00", end: "17:00", breakStart: "12:00", breakEnd: "13:00" },
    gym: { start: "06:40", end: "08:00" },
    meals: {
      breakfast: { time: "08:10", optionId: "bf-cuscuz-ovos" },
      snack_morning: { time: "06:20", optionId: "sm-banana" },
      lunch: { time: "12:30", optionId: "ln-principal" },
      snack_afternoon: { time: "17:15", optionId: "sa-iogurte-tribos" },
      dinner: { time: "19:30", optionId: "dn-hamburguer-fit" },
      supper: { time: "21:30", optionId: "sp-pipoca-pate" },
    },
  },
  {
    id: "ter",
    label: "Terça",
    work: { start: "09:00", end: "17:00", breakStart: "12:00", breakEnd: "13:00" },
    gym: { start: "06:40", end: "08:00" },
    meals: {
      breakfast: { time: "08:10", optionId: "bf-tapioca-frango" },
      snack_morning: { time: "06:20", optionId: "sm-maca" },
      lunch: { time: "12:30", optionId: "ln-macarrao-fit" },
      snack_afternoon: { time: "17:15", optionId: "sa-banana-whey" },
      dinner: { time: "19:30", optionId: "dn-pizza-frigideira" },
      supper: { time: "21:30", optionId: "sp-iogurte-castanhas" },
    },
  },
  {
    id: "qua",
    label: "Quarta",
    work: { start: "12:00", end: "20:00", breakStart: "16:00", breakEnd: "17:00" },
    gym: { start: "06:40", end: "08:00" },
    meals: {
      breakfast: { time: "08:15", optionId: "bf-sanduiche-ovos" },
      snack_morning: { time: "06:20", optionId: "sm-uvas" },
      lunch: { time: "11:30", optionId: "ln-arroz-couve-legumes" },
      snack_afternoon: { time: "17:30", optionId: "sa-shake" },
      dinner: { time: "20:30", optionId: "dn-brusqueta-suco" },
      supper: { time: "21:30", optionId: "sp-torrada-requeijao" },
    },
  },
  {
    id: "qui",
    label: "Quinta",
    work: { start: "14:00", end: "18:00" },
    gym: { start: "06:40", end: "08:00" },
    meals: {
      breakfast: { time: "08:15", optionId: "bf-bisnaguitos" },
      snack_morning: { time: "10:15", optionId: "sm-ameixa" },
      lunch: { time: "12:30", optionId: "ln-almondega-brocolis" },
      snack_afternoon: { time: "16:00", optionId: "sa-paes-requeijao" },
      dinner: { time: "19:30", optionId: "dn-cuscuz-proteina" },
      supper: { time: "21:30", optionId: "sp-iogurte-tribos" },
    },
  },
  {
    id: "sex",
    label: "Sexta",
    work: { start: "12:00", end: "20:00", breakStart: "16:00", breakEnd: "17:00" },
    gym: { start: "06:40", end: "08:00" },
    meals: {
      breakfast: { time: "08:15", optionId: "bf-paoqueijo-frigideira" },
      snack_morning: { time: "06:20", optionId: "sm-abacaxi" },
      lunch: { time: "11:30", optionId: "ln-principal" },
      snack_afternoon: { time: "17:30", optionId: "sa-iogurte-tribos" },
      dinner: { time: "20:30", optionId: "dn-pizza-frigideira" },
      supper: { time: "21:30", optionId: "sp-iogurte-castanhas" },
    },
  },
  {
    id: "sab",
    label: "Sábado",
    work: { start: "07:30", end: "16:30", breakStart: "12:00", breakEnd: "13:00" },
    gym: null,
    meals: {
      breakfast: { time: "06:50", optionId: "bf-sanduiche-ovos" },
      snack_morning: { time: "10:00", optionId: "sm-melao" },
      lunch: { time: "12:30", optionId: "ln-macarrao-fit" },
      snack_afternoon: { time: "17:00", optionId: "sa-shake" },
      dinner: { time: "19:30", optionId: "dn-cuscuz-proteina" },
      supper: { time: "21:30", optionId: "sp-pipoca-pate" },
    },
  },
  {
    id: "dom",
    label: "Domingo",
    work: undefined,
    gym: null,
    meals: {
      breakfast: { time: "07:20", optionId: "bf-tapioca-frango" },
      snack_morning: { time: "10:00", optionId: "sm-mamao" },
      lunch: { time: "12:30", optionId: "ln-principal" },
      snack_afternoon: { time: "15:30", optionId: "sa-paes-requeijao" },
      dinner: { time: "19:30", optionId: "dn-hamburguer-fit" },
      supper: { time: "21:30", optionId: "sp-iogurte-tribos" },
    },
  },
];
