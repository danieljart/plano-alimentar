
-- 1) Meta calórica diária no perfil
alter table public.profiles
  add column if not exists daily_calorie_target integer not null default 1500;

-- 2) Índices de performance para consultas frequentes
create index if not exists idx_food_items_category_healthy
  on public.food_items (category, is_healthy);

create index if not exists idx_dishes_mealtype_chicken
  on public.dishes (meal_type, is_chicken_based);

create index if not exists idx_plan_meals_plan_day
  on public.plan_meals (plan_id, day_of_week);

create index if not exists idx_user_meal_history_user_date
  on public.user_meal_history (user_id, consumed_date);

create index if not exists idx_user_prefs_user_food
  on public.user_preferences (user_id, food_item_id);

-- 3) Opcional: Índices úteis para joins/lookup rápidos
create index if not exists idx_dish_ingredients_dish
  on public.dish_ingredients (dish_id);

create index if not exists idx_dish_ingredients_food
  on public.dish_ingredients (food_item_id);
