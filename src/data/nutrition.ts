// Nutrition database with values per 100g
export interface NutritionData {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  sugars: number
}

export interface FoodItem {
  id: string
  name: string
  nutrition: NutritionData
  portionSize: number // grams
  category: string
}

// Base nutrition database for foods mentioned in meal plans
export const NUTRITION_DB: Record<string, FoodItem> = {
  // Grains & Starches
  "cuscuz": {
    id: "cuscuz",
    name: "Cuscuz",
    nutrition: { calories: 112, protein: 3.8, carbs: 23, fat: 0.2, fiber: 1.4, sodium: 1, sugars: 0.2 },
    portionSize: 100,
    category: "grains"
  },
  "arroz_branco": {
    id: "arroz_branco", 
    name: "Arroz branco cozido",
    nutrition: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, sodium: 1, sugars: 0.1 },
    portionSize: 100,
    category: "grains"
  },
  "macarrao_integral": {
    id: "macarrao_integral",
    name: "Macarrão integral",
    nutrition: { calories: 124, protein: 5, carbs: 25, fat: 1.1, fiber: 3.9, sodium: 3, sugars: 1.8 },
    portionSize: 100,
    category: "grains"
  },
  "pao_integral": {
    id: "pao_integral",
    name: "Pão integral",
    nutrition: { calories: 247, protein: 13, carbs: 41, fat: 4.2, fiber: 7, sodium: 681, sugars: 6 },
    portionSize: 50,
    category: "grains"
  },
  "tapioca": {
    id: "tapioca",
    name: "Goma de tapioca",
    nutrition: { calories: 358, protein: 1.2, carbs: 88, fat: 0.3, fiber: 1.4, sodium: 1, sugars: 3.3 },
    portionSize: 30,
    category: "grains"
  },
  "aveia": {
    id: "aveia",
    name: "Aveia em flocos",
    nutrition: { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6, sodium: 2, sugars: 0.99 },
    portionSize: 30,
    category: "grains"
  },

  // Proteins
  "frango_cozido": {
    id: "frango_cozido",
    name: "Frango cozido/desfiado",
    nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sodium: 74, sugars: 0 },
    portionSize: 100,
    category: "protein"
  },
  "patinho_moido": {
    id: "patinho_moido",
    name: "Patinho moído magro",
    nutrition: { calories: 158, protein: 26, carbs: 0, fat: 5.1, fiber: 0, sodium: 65, sugars: 0 },
    portionSize: 100,
    category: "protein"
  },
  "ovo": {
    id: "ovo",
    name: "Ovo de galinha",
    nutrition: { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, sodium: 142, sugars: 1.1 },
    portionSize: 60,
    category: "protein"
  },
  "peixe": {
    id: "peixe",
    name: "Peixe grelhado",
    nutrition: { calories: 136, protein: 25, carbs: 0, fat: 3.0, fiber: 0, sodium: 59, sugars: 0 },
    portionSize: 120,
    category: "protein"
  },

  // Dairy
  "queijo_minas": {
    id: "queijo_minas",
    name: "Queijo minas frescal light",
    nutrition: { calories: 264, protein: 17.4, carbs: 3.8, fat: 20, fiber: 0, sodium: 346, sugars: 3.8 },
    portionSize: 30,
    category: "dairy"
  },
  "requeijao_light": {
    id: "requeijao_light",
    name: "Requeijão light",
    nutrition: { calories: 176, protein: 11, carbs: 7, fat: 12, fiber: 0, sodium: 842, sugars: 7 },
    portionSize: 30,
    category: "dairy"
  },
  "iogurte_pro": {
    id: "iogurte_pro",
    name: "Iogurte Pro Itambé",
    nutrition: { calories: 58, protein: 10, carbs: 4.1, fat: 0, fiber: 0, sodium: 47, sugars: 4.1 },
    portionSize: 120,
    category: "dairy"
  },

  // Vegetables
  "brocolis": {
    id: "brocolis", 
    name: "Brócolis cozido",
    nutrition: { calories: 35, protein: 2.4, carbs: 7, fat: 0.4, fiber: 3.3, sodium: 41, sugars: 2.2 },
    portionSize: 100,
    category: "vegetables"
  },
  "couve": {
    id: "couve",
    name: "Couve refogada",
    nutrition: { calories: 31, protein: 2.9, carbs: 5.7, fat: 0.7, fiber: 3.7, sodium: 38, sugars: 2.3 },
    portionSize: 100,
    category: "vegetables"
  },
  "legumes_vapor": {
    id: "legumes_vapor",
    name: "Legumes no vapor (mix)",
    nutrition: { calories: 45, protein: 2.1, carbs: 8.8, fat: 0.3, fiber: 3.2, sodium: 15, sugars: 4.1 },
    portionSize: 100,
    category: "vegetables"
  },

  // Legumes
  "feijao": {
    id: "feijao",
    name: "Feijão cozido",
    nutrition: { calories: 91, protein: 4.8, carbs: 16, fat: 0.5, fiber: 7.4, sodium: 2, sugars: 0.3 },
    portionSize: 50,
    category: "legumes"
  },

  // Fruits
  "banana": {
    id: "banana",
    name: "Banana nanica",
    nutrition: { calories: 87, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, sodium: 1, sugars: 12 },
    portionSize: 75,
    category: "fruits"
  },
  "maca": {
    id: "maca",
    name: "Maçã com casca",
    nutrition: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, sodium: 1, sugars: 10 },
    portionSize: 150,
    category: "fruits"
  },
  "uva": {
    id: "uva",
    name: "Uva rosada",
    nutrition: { calories: 69, protein: 0.7, carbs: 18, fat: 0.2, fiber: 0.9, sodium: 2, sugars: 16 },
    portionSize: 100,
    category: "fruits"
  },
  "mamao": {
    id: "mamao",
    name: "Mamão formosa",
    nutrition: { calories: 40, protein: 0.5, carbs: 10, fat: 0.3, fiber: 1.7, sodium: 8, sugars: 7.8 },
    portionSize: 100,
    category: "fruits"
  },
  "melao": {
    id: "melao",
    name: "Melão",
    nutrition: { calories: 29, protein: 0.7, carbs: 7.5, fat: 0.2, fiber: 0.8, sodium: 18, sugars: 6.2 },
    portionSize: 115,
    category: "fruits"
  },

  // Seeds & Nuts
  "chia": {
    id: "chia",
    name: "Semente de chia",
    nutrition: { calories: 486, protein: 16.5, carbs: 42.1, fat: 30.7, fiber: 34.4, sodium: 16, sugars: 0 },
    portionSize: 10,
    category: "seeds"
  },
  "castanha_caju": {
    id: "castanha_caju",
    name: "Castanha de caju",
    nutrition: { calories: 553, protein: 18.2, carbs: 30.2, fat: 43.8, fiber: 3.3, sodium: 12, sugars: 5.9 },
    portionSize: 20,
    category: "nuts"
  },

  // Others
  "whey_protein": {
    id: "whey_protein",
    name: "Whey Protein 100% Pure",
    nutrition: { calories: 410, protein: 82, carbs: 8, fat: 6, fiber: 0, sodium: 300, sugars: 8 },
    portionSize: 30,
    category: "supplements"
  },
  "cafe": {
    id: "cafe",
    name: "Café sem açúcar",
    nutrition: { calories: 2, protein: 0.1, carbs: 0, fat: 0, fiber: 0, sodium: 2, sugars: 0 },
    portionSize: 150,
    category: "beverages"
  }
}

// Calculate nutrition for a list of ingredients with quantities
export function calculateMealNutrition(ingredients: Array<{ foodId: string; quantity: number }>): NutritionData {
  return ingredients.reduce((total, ingredient) => {
    const food = NUTRITION_DB[ingredient.foodId]
    if (!food) return total

    const factor = ingredient.quantity / 100 // Convert to per 100g factor
    
    return {
      calories: total.calories + (food.nutrition.calories * factor),
      protein: total.protein + (food.nutrition.protein * factor),
      carbs: total.carbs + (food.nutrition.carbs * factor),
      fat: total.fat + (food.nutrition.fat * factor),
      fiber: total.fiber + (food.nutrition.fiber * factor),
      sodium: total.sodium + (food.nutrition.sodium * factor),
      sugars: total.sugars + (food.nutrition.sugars * factor)
    }
  }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0, sugars: 0 })
}

// Meal composition for each option (approximate ingredient breakdown)
export const MEAL_COMPOSITIONS: Record<string, Array<{ foodId: string; quantity: number }>> = {
  // Breakfast options
  "bf-cuscuz-ovos": [
    { foodId: "cuscuz", quantity: 60 },
    { foodId: "chia", quantity: 10 },
    { foodId: "ovo", quantity: 120 }, // 2 eggs
    { foodId: "queijo_minas", quantity: 30 },
    { foodId: "cafe", quantity: 150 }
  ],
  "bf-tapioca-frango": [
    { foodId: "tapioca", quantity: 30 },
    { foodId: "chia", quantity: 10 },
    { foodId: "frango_cozido", quantity: 60 },
    { foodId: "requeijao_light", quantity: 15 },
    { foodId: "cafe", quantity: 150 }
  ],
  "bf-sanduiche-ovos": [
    { foodId: "pao_integral", quantity: 100 }, // 2 slices
    { foodId: "ovo", quantity: 120 },
    { foodId: "queijo_minas", quantity: 30 },
    { foodId: "cafe", quantity: 150 }
  ],
  "bf-bisnaguitos": [
    { foodId: "pao_integral", quantity: 75 }, // 3 mini pães integrais
    { foodId: "queijo_minas", quantity: 30 },
    { foodId: "requeijao_light", quantity: 15 }
  ],
  "bf-paoqueijo-frigideira": [
    { foodId: "ovo", quantity: 120 }, // 2 ovos
    { foodId: "requeijao_light", quantity: 20 },
    { foodId: "queijo_minas", quantity: 20 },
    { foodId: "banana", quantity: 75 },
    { foodId: "aveia", quantity: 15 },
    { foodId: "cafe", quantity: 150 }
  ],

  // Snacks
  "sm-banana": [{ foodId: "banana", quantity: 75 }],
  "sm-maca": [{ foodId: "maca", quantity: 150 }],
  "sm-uvas": [{ foodId: "uva", quantity: 84 }], // 12 small grapes
  "sm-mamao": [{ foodId: "mamao", quantity: 100 }],
  "sm-melao": [{ foodId: "melao", quantity: 115 }],

  // Lunch options  
  "ln-principal": [
    { foodId: "frango_cozido", quantity: 80 },
    { foodId: "arroz_branco", quantity: 60 },
    { foodId: "feijao", quantity: 50 },
    { foodId: "legumes_vapor", quantity: 100 },
    { foodId: "brocolis", quantity: 50 }
  ],
  "ln-macarrao-fit": [
    { foodId: "macarrao_integral", quantity: 75 },
    { foodId: "patinho_moido", quantity: 60 },
    { foodId: "queijo_minas", quantity: 30 }
  ],
  "ln-arroz-couve-legumes": [
    { foodId: "frango_cozido", quantity: 80 },
    { foodId: "arroz_branco", quantity: 45 },
    { foodId: "couve", quantity: 100 },
    { foodId: "legumes_vapor", quantity: 100 }
  ],
  "ln-almondega-brocolis": [
    { foodId: "patinho_moido", quantity: 75 },
    { foodId: "arroz_branco", quantity: 60 },
    { foodId: "brocolis", quantity: 60 }
  ],

  // Afternoon snacks
  "sa-iogurte-tribos": [
    { foodId: "iogurte_pro", quantity: 120 }
    // Note: Tribos crackers not in nutrition DB yet
  ],
  "sa-banana-whey": [
    { foodId: "banana", quantity: 150 }, // 2 bananas
    { foodId: "whey_protein", quantity: 30 },
    { foodId: "aveia", quantity: 15 }
  ],
  "sa-paes-requeijao": [
    { foodId: "pao_integral", quantity: 100 },
    { foodId: "requeijao_light", quantity: 30 },
    { foodId: "queijo_minas", quantity: 30 }
  ],
  "sa-shake": [
    { foodId: "banana", quantity: 150 },
    { foodId: "whey_protein", quantity: 30 }
  ],

  // Dinner options
  "dn-cuscuz-proteina": [
    { foodId: "cuscuz", quantity: 60 },
    { foodId: "chia", quantity: 10 },
    { foodId: "requeijao_light", quantity: 15 },
    { foodId: "patinho_moido", quantity: 60 }
  ],
  "dn-hamburguer-fit": [
    { foodId: "pao_integral", quantity: 100 },
    { foodId: "patinho_moido", quantity: 75 },
    { foodId: "queijo_minas", quantity: 30 }
  ],
  "dn-pizza-frigideira": [
    { foodId: "pao_integral", quantity: 60 }, // wrap aproximado
    { foodId: "frango_cozido", quantity: 80 },
    { foodId: "queijo_minas", quantity: 30 }
  ],
  "dn-brusqueta-suco": [
    { foodId: "pao_integral", quantity: 75 },
    { foodId: "queijo_minas", quantity: 30 }
  ],

  // Supper options
  "sp-iogurte-tribos": [
    { foodId: "iogurte_pro", quantity: 120 }
  ],
  "sp-iogurte-castanhas": [
    { foodId: "iogurte_pro", quantity: 170 },
    { foodId: "castanha_caju", quantity: 20 } // 8 units
  ],
  "sp-torrada-requeijao": [
    { foodId: "pao_integral", quantity: 50 },
    { foodId: "requeijao_light", quantity: 30 }
  ]
}

// Get nutrition for a specific meal option
export function getMealNutrition(optionId: string): NutritionData {
  const composition = MEAL_COMPOSITIONS[optionId]
  if (!composition) {
    // Return default values if composition not found
    return { calories: 300, protein: 15, carbs: 30, fat: 8, fiber: 3, sodium: 200, sugars: 5 }
  }
  return calculateMealNutrition(composition)
}
