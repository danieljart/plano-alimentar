
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, Heart, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/components/ui/use-toast'

interface FoodCategory {
  id: string
  name: string
  icon: string
  foods: Array<{ id: string; name: string; image?: string }>
}

// Categorias revisadas conforme instruções (proteínas sem laticínios; itens acessíveis no BR)
// Laticínios ficam em categoria própria separada
const FOOD_CATEGORIES: FoodCategory[] = [
  {
    id: 'proteins',
    name: 'Proteínas (Misturas)',
    icon: '🥩',
    foods: [
      { id: 'carne_bovina_patinho', name: 'Carne bovina (patinho)', image: '/api/placeholder/80/80' },
      { id: 'carne_bovina_alcatra', name: 'Carne bovina (alcatra)', image: '/api/placeholder/80/80' },
      { id: 'frango_peito', name: 'Frango (peito)', image: '/api/placeholder/80/80' },
      { id: 'frango_coxa', name: 'Frango (coxa)', image: '/api/placeholder/80/80' },
      { id: 'peixe_tilapia', name: 'Peixe (tilápia)', image: '/api/placeholder/80/80' },
      { id: 'peixe_sardinha', name: 'Peixe (sardinha)', image: '/api/placeholder/80/80' },
      { id: 'ovos', name: 'Ovos', image: '/api/placeholder/80/80' },
      { id: 'lentilha', name: 'Lentilha', image: '/api/placeholder/80/80' },
      { id: 'grao_de_bico', name: 'Grão de bico', image: '/api/placeholder/80/80' },
      { id: 'feijao', name: 'Feijão', image: '/api/placeholder/80/80' },
      { id: 'tofu', name: 'Tofu', image: '/api/placeholder/80/80' },
    ]
  },
  {
    id: 'carbs',
    name: 'Carboidratos',
    icon: '🌾',
    foods: [
      { id: 'arroz_integral', name: 'Arroz integral', image: '/api/placeholder/80/80' },
      { id: 'macarrao_integral', name: 'Macarrão integral', image: '/api/placeholder/80/80' },
      { id: 'batata_doce', name: 'Batata-doce', image: '/api/placeholder/80/80' },
      { id: 'mandioca', name: 'Mandioca', image: '/api/placeholder/80/80' },
      { id: 'cuscuz', name: 'Cuscuz', image: '/api/placeholder/80/80' },
      { id: 'tapioca', name: 'Tapioca', image: '/api/placeholder/80/80' },
      { id: 'pao_integral', name: 'Pão integral', image: '/api/placeholder/80/80' },
      { id: 'aveia', name: 'Aveia', image: '/api/placeholder/80/80' },
      { id: 'quinoa', name: 'Quinoa', image: '/api/placeholder/80/80' },
    ]
  },
  {
    id: 'vegetables',
    name: 'Legumes e Verduras',
    icon: '🥬',
    foods: [
      { id: 'brocolis', name: 'Brócolis', image: '/api/placeholder/80/80' },
      { id: 'couve_flor', name: 'Couve-flor', image: '/api/placeholder/80/80' },
      { id: 'cenoura', name: 'Cenoura', image: '/api/placeholder/80/80' },
      { id: 'abobrinha', name: 'Abobrinha', image: '/api/placeholder/80/80' },
      { id: 'berinjela', name: 'Berinjela', image: '/api/placeholder/80/80' },
      { id: 'espinafre', name: 'Espinafre', image: '/api/placeholder/80/80' },
      { id: 'alface', name: 'Alface', image: '/api/placeholder/80/80' },
      { id: 'tomate', name: 'Tomate', image: '/api/placeholder/80/80' },
      { id: 'pepino', name: 'Pepino', image: '/api/placeholder/80/80' },
      { id: 'vagem', name: 'Vagem', image: '/api/placeholder/80/80' },
      { id: 'quiabo', name: 'Quiabo', image: '/api/placeholder/80/80' },
      { id: 'pimentao', name: 'Pimentão', image: '/api/placeholder/80/80' },
    ]
  },
  {
    id: 'fruits',
    name: 'Frutas',
    icon: '🍎',
    foods: [
      { id: 'banana', name: 'Banana', image: '/api/placeholder/80/80' },
      { id: 'maca', name: 'Maçã', image: '/api/placeholder/80/80' },
      { id: 'morango', name: 'Morango', image: '/api/placeholder/80/80' },
      { id: 'uva', name: 'Uva', image: '/api/placeholder/80/80' },
      { id: 'laranja', name: 'Laranja', image: '/api/placeholder/80/80' },
      { id: 'abacaxi', name: 'Abacaxi', image: '/api/placeholder/80/80' },
      { id: 'mamao', name: 'Mamão', image: '/api/placeholder/80/80' },
      { id: 'manga', name: 'Manga', image: '/api/placeholder/80/80' },
      { id: 'melancia', name: 'Melancia', image: '/api/placeholder/80/80' },
      { id: 'pera', name: 'Pera', image: '/api/placeholder/80/80' },
      { id: 'ameixa', name: 'Ameixa', image: '/api/placeholder/80/80' },
    ]
  },
  {
    id: 'fats',
    name: 'Gorduras Boas',
    icon: '🥑',
    foods: [
      { id: 'abacate', name: 'Abacate', image: '/api/placeholder/80/80' },
      { id: 'azeite_extra_virgem', name: 'Azeite extra virgem', image: '/api/placeholder/80/80' },
      { id: 'castanha_caju', name: 'Castanha de caju', image: '/api/placeholder/80/80' },
      { id: 'castanha_para', name: 'Castanha do Pará', image: '/api/placeholder/80/80' },
      { id: 'amendoas', name: 'Amêndoas', image: '/api/placeholder/80/80' },
      { id: 'nozes', name: 'Nozes', image: '/api/placeholder/80/80' },
      { id: 'chia', name: 'Semente de chia', image: '/api/placeholder/80/80' },
      { id: 'linhaca', name: 'Semente de linhaça', image: '/api/placeholder/80/80' },
      { id: 'girassol', name: 'Semente de girassol', image: '/api/placeholder/80/80' },
    ]
  },
  {
    id: 'snacks',
    name: 'Snacks Saudáveis',
    icon: '🍿',
    foods: [
      { id: 'pipoca', name: 'Pipoca (sem óleo)', image: '/api/placeholder/80/80' },
      { id: 'biscoito_arroz', name: 'Biscoito de arroz', image: '/api/placeholder/80/80' },
      { id: 'frutas_secas', name: 'Frutas secas', image: '/api/placeholder/80/80' },
      { id: 'ovos_cozidos', name: 'Ovos cozidos', image: '/api/placeholder/80/80' },
      { id: 'palitos_vegetais', name: 'Palitos de cenoura/pepino', image: '/api/placeholder/80/80' },
    ]
  },
  {
    id: 'dairy',
    name: 'Laticínios e Derivados',
    icon: '🧀',
    foods: [
      { id: 'leite', name: 'Leite', image: '/api/placeholder/80/80' },
      { id: 'queijo_minas', name: 'Queijo minas', image: '/api/placeholder/80/80' },
      { id: 'iogurte_natural', name: 'Iogurte natural', image: '/api/placeholder/80/80' },
    ]
  },
]

interface PreferencesOnboardingProps {
  onComplete: () => void
}

export function PreferencesOnboarding({ onComplete }: PreferencesOnboardingProps) {
  const [selectedFoods, setSelectedFoods] = useState<Set<string>>(new Set())
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['proteins']))
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [dailyCalories, setDailyCalories] = useState<number>(1500)
  const { toast } = useToast()

  useEffect(() => {
    // Restaurar preferências locais e meta calórica do perfil
    try {
      const raw = localStorage.getItem('selectedFoods')
      if (raw) {
        const parsed: string[] = JSON.parse(raw)
        setSelectedFoods(new Set(parsed))
      }
    } catch (e) {
      console.log('No local selectedFoods yet')
    }

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase
        .from('profiles')
        .select('daily_calorie_target')
        .eq('id', user.id)
        .maybeSingle()

      if (data?.daily_calorie_target) {
        setDailyCalories(Number(data.daily_calorie_target))
      }
    })
  }, [])

  const filteredCategories = FOOD_CATEGORIES.map(category => ({
    ...category,
    foods: category.foods.filter(food => 
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.foods.length > 0 || searchTerm === '')

  const toggleFood = (foodId: string) => {
    const newSelected = new Set(selectedFoods)
    if (newSelected.has(foodId)) {
      newSelected.delete(foodId)
    } else {
      newSelected.add(foodId)
    }
    setSelectedFoods(newSelected)
    
    if ('vibrate' in navigator) {
      navigator.vibrate(30)
    }
  }

  const toggleCategory = (categoryId: string) => {
    const newOpen = new Set(openCategories)
    if (newOpen.has(categoryId)) {
      newOpen.delete(categoryId)
    } else {
      newOpen.add(categoryId)
    }
    setOpenCategories(newOpen)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Usuário não encontrado')

      // Persistir meta calórica e marcar onboarding concluído
      await supabase
        .from('profiles')
        .update({ 
          preferences_completed: true,
          daily_calorie_target: Math.max(1000, Math.min(4000, Number(dailyCalories) || 1500))
        })
        .eq('id', user.id)

      // Guardar preferências localmente (evitamos inconsistências em user_preferences sem catálogo de food_items)
      localStorage.setItem('selectedFoods', JSON.stringify(Array.from(selectedFoods)))

      toast({
        title: 'Preferências salvas',
        description: 'Suas preferências e meta calórica foram atualizadas.',
      })

      onComplete()
    } catch (error) {
      console.error('Error saving preferences:', error)
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar suas preferências. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(334_100%_97%)] to-[hsl(334_90%_96%)] p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-[hsl(334_80%_65%)] rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-primary">
                Vamos personalizar seu plano!
              </CardTitle>
              <CardDescription className="text-base">
                Selecione os alimentos que você mais gosta e informe sua meta calórica diária.
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Campo meta calórica diária */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="kcal" className="text-sm font-medium text-muted-foreground">
                Meta calórica diária (kcal)
              </label>
              <Input
                id="kcal"
                type="number"
                inputMode="numeric"
                min={1000}
                max={4000}
                step={50}
                value={dailyCalories}
                onChange={(e) => setDailyCalories(Number(e.target.value))}
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">
                Usaremos essa meta para ajustar automaticamente o seu plano alimentar.
              </p>
            </div>

            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar alimentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Indicador de progresso */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {selectedFoods.size} alimento{selectedFoods.size !== 1 ? 's' : ''} selecionado{selectedFoods.size !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Categorias */}
            <div className="space-y-4">
              {filteredCategories.map((category) => {
                const selectedCount = category.foods.filter(food => selectedFoods.has(food.id)).length
                const isOpen = openCategories.has(category.id)
                
                return (
                  <Collapsible 
                    key={category.id} 
                    open={isOpen}
                    onOpenChange={() => toggleCategory(category.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-4 h-auto bg-accent/50 hover:bg-accent"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div className="text-left">
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {selectedCount} de {category.foods.length} selecionados
                            </p>
                          </div>
                        </div>
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isOpen ? "rotate-180" : ""
                        )} />
                      </Button>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="pt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {category.foods.map((food) => {
                          const isSelected = selectedFoods.has(food.id)
                          
                          return (
                            <Button
                              key={food.id}
                              variant="ghost"
                              onClick={() => toggleFood(food.id)}
                              className={cn(
                                "h-auto p-3 flex flex-col gap-2 transition-all duration-200",
                                isSelected 
                                  ? "bg-primary/10 border-2 border-primary text-primary scale-105" 
                                  : "border-2 border-transparent hover:border-primary/30 hover:scale-105"
                              )}
                            >
                              <div className="relative">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                                  <span className="text-2xl">🍽️</span>
                                </div>
                                {isSelected && (
                                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                    <Heart className="w-3 h-3 text-primary-foreground fill-current" />
                                  </div>
                                )}
                              </div>
                              <span className="text-sm font-medium text-center">
                                {food.name}
                              </span>
                            </Button>
                          )
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )
              })}
            </div>

            {/* Botão salvar */}
            <div className="pt-6">
              <Button
                onClick={handleSubmit}
                disabled={selectedFoods.size === 0 || loading}
                className="w-full h-12 text-base font-semibold"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Salvando preferências...
                  </>
                ) : (
                  `Finalizar (${selectedFoods.size} selecionados)`
                )}
              </Button>
              
              {selectedFoods.size === 0 && (
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Selecione pelo menos 1 alimento para continuar
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
