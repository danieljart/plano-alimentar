
-- Enable extension for UUID generation (usually already enabled on Supabase)
create extension if not exists "pgcrypto";

-- Helper trigger to keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 1) User profiles (one row per auth user)
create table if not exists public.profiles (
  id uuid primary key,                              -- equals auth.uid(); no FK to auth.users
  email text,
  name text,
  preferences_completed boolean not null default false,
  api_key_gemini_encrypted text,                    -- client-side encrypted string
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

-- RLS: owner-only access
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles
  for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  using (auth.uid() = id);

-- 2) Food items catalog (global, read-only for clients)
create table if not exists public.food_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,                                   -- e.g. protein, carb, veggie, fruit, dairy, fat, spice
  calories_per_100g numeric not null check (calories_per_100g >= 0),
  protein_per_100g numeric not null default 0 check (protein_per_100g >= 0),
  carbs_per_100g numeric not null default 0 check (carbs_per_100g >= 0),
  fat_per_100g numeric not null default 0 check (fat_per_100g >= 0),
  fiber_per_100g numeric not null default 0 check (fiber_per_100g >= 0),
  sodium_mg_per_100g numeric not null default 0 check (sodium_mg_per_100g >= 0),
  sugars_per_100g numeric not null default 0 check (sugars_per_100g >= 0),
  image_url text,
  preparation_time_minutes int,
  difficulty_level text,                                    -- easy, medium, hard
  is_healthy boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_food_items_updated_at
before update on public.food_items
for each row execute function public.set_updated_at();

alter table public.food_items enable row level security;

-- RLS: allow read for everyone; no write policies => read-only
drop policy if exists "food_items_read_all" on public.food_items;
create policy "food_items_read_all"
  on public.food_items
  for select
  using (true);

create index if not exists food_items_category_healthy_idx on public.food_items (category, is_healthy);

-- 3) Dishes (global, composed of food_items; read-only for clients)
create table if not exists public.dishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  total_calories numeric not null check (total_calories >= 0),
  total_protein numeric not null default 0,
  total_carbs numeric not null default 0,
  total_fat numeric not null default 0,
  total_fiber numeric not null default 0,
  preparation_time_minutes int,
  difficulty_level text,
  image_url text,
  meal_type text not null check (meal_type in ('breakfast','snack_morning','lunch','snack_afternoon','dinner','supper')),
  is_chicken_based boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_dishes_updated_at
before update on public.dishes
for each row execute function public.set_updated_at();

alter table public.dishes enable row level security;

drop policy if exists "dishes_read_all" on public.dishes;
create policy "dishes_read_all"
  on public.dishes
  for select
  using (true);

create index if not exists dishes_mealtype_chicken_idx on public.dishes (meal_type, is_chicken_based);

-- 4) Dish ingredients (mapping dishes -> food items)
create table if not exists public.dish_ingredients (
  dish_id uuid not null references public.dishes(id) on delete cascade,
  food_item_id uuid not null references public.food_items(id),
  quantity_grams numeric not null check (quantity_grams > 0),
  preparation_method text,
  primary key (dish_id, food_item_id)
);
alter table public.dish_ingredients enable row level security;

drop policy if exists "dish_ing_read_all" on public.dish_ingredients;
create policy "dish_ing_read_all"
  on public.dish_ingredients
  for select
  using (true);

create index if not exists dish_ingredients_dish_idx on public.dish_ingredients (dish_id);

-- 5) Generated weekly plans (per user)
create table if not exists public.generated_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  week_start_date date not null,                 -- Monday of the plan
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create unique index if not exists generated_plans_user_week_uniq on public.generated_plans (user_id, week_start_date);

alter table public.generated_plans enable row level security;

-- RLS owner-only
drop policy if exists "plans_select_own" on public.generated_plans;
create policy "plans_select_own"
  on public.generated_plans
  for select
  using (auth.uid() = user_id);

drop policy if exists "plans_insert_own" on public.generated_plans;
create policy "plans_insert_own"
  on public.generated_plans
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "plans_update_own" on public.generated_plans;
create policy "plans_update_own"
  on public.generated_plans
  for update
  using (auth.uid() = user_id);

drop policy if exists "plans_delete_own" on public.generated_plans;
create policy "plans_delete_own"
  on public.generated_plans
  for delete
  using (auth.uid() = user_id);

-- 6) Plan meals (meals inside a generated plan)
create table if not exists public.plan_meals (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.generated_plans(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 1 and 7),  -- 1=Mon ... 7=Sun
  meal_type text not null check (meal_type in ('breakfast','snack_morning','lunch','snack_afternoon','dinner','supper')),
  dish_id uuid not null references public.dishes(id),
  alternatives jsonb not null default '[]'::jsonb
);
create index if not exists plan_meals_plan_day_idx on public.plan_meals (plan_id, day_of_week);

alter table public.plan_meals enable row level security;

-- RLS: access via parent plan ownership
drop policy if exists "plan_meals_select_by_owner" on public.plan_meals;
create policy "plan_meals_select_by_owner"
  on public.plan_meals
  for select
  using (
    exists (
      select 1 from public.generated_plans p
      where p.id = plan_id and p.user_id = auth.uid()
    )
  );

drop policy if exists "plan_meals_write_by_owner" on public.plan_meals;
create policy "plan_meals_write_by_owner"
  on public.plan_meals
  for all
  using (
    exists (
      select 1 from public.generated_plans p
      where p.id = plan_id and p.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.generated_plans p
      where p.id = plan_id and p.user_id = auth.uid()
    )
  );

-- 7) User food preferences
create table if not exists public.user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  food_item_id uuid not null references public.food_items(id),
  preference_level smallint not null check (preference_level between 1 and 5),
  created_at timestamptz not null default now()
);
create index if not exists user_prefs_user_item_idx on public.user_preferences (user_id, food_item_id);

alter table public.user_preferences enable row level security;

drop policy if exists "user_prefs_select_own" on public.user_preferences;
create policy "user_prefs_select_own"
  on public.user_preferences
  for select
  using (auth.uid() = user_id);

drop policy if exists "user_prefs_write_own" on public.user_preferences;
create policy "user_prefs_write_own"
  on public.user_preferences
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 8) User meal history (to enforce non-repetition + analytics)
create table if not exists public.user_meal_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  dish_id uuid not null references public.dishes(id),
  consumed_date date not null,
  meal_type text not null check (meal_type in ('breakfast','snack_morning','lunch','snack_afternoon','dinner','supper')),
  created_at timestamptz not null default now()
);
create index if not exists meal_hist_user_date_idx on public.user_meal_history (user_id, consumed_date);
create index if not exists meal_hist_user_dish_date_idx on public.user_meal_history (user_id, dish_id, consumed_date);

alter table public.user_meal_history enable row level security;

drop policy if exists "meal_hist_select_own" on public.user_meal_history;
create policy "meal_hist_select_own"
  on public.user_meal_history
  for select
  using (auth.uid() = user_id);

drop policy if exists "meal_hist_write_own" on public.user_meal_history;
create policy "meal_hist_write_own"
  on public.user_meal_history
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
