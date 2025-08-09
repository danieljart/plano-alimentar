import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, Heart, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/integrations/supabase/client'

interface FoodCategory {
  id: string
  name: string
  icon: string
  foods: Array<{ id: string; name: string; image?: string }>
}

const FOOD_CATEGORIES: FoodCategory[] = [
  {
    id: 'proteins',
    name: 'Proteínas',
    icon: '🥩',
    foods: [
      { id: 'chicken', name: 'Frango', image: '/api/placeholder/80/80' },
      { id: 'fish', name: 'Peixe', image: '/api/placeholder/80/80' },
      { id: 'eggs', name: 'Ovos', image: '/api/placeholder/80/80' },
      { id: 'beans', name: 'Feijão', image: '/api/placeholder/80/80' },
      { id: 'lentils', name: 'Lentilha', image: '/api/placeholder/80/80' },
    ]
  },
  {
    id: 'carbs',
    name: 'Carboidratos',
    icon: '🌾',
    foods: [
      { id: 'rice', name: 'Arroz', image: '/api/placeholder/80/80' },
      { id: 'quinoa', name: 'Quinoa', image: '/api/placeholder/80/80' },
      { id: 'sweet_potato', name: 'Batata-doce', image: '/api/placeholder/80/80' },
      { id: 'oats', name: 'Aveia', image: '/api/placeholder/80/80' },
      { id: 'pasta', name: 'Macarrão integral', image: '/api/placeholder/80/80' },
    ]
  },
  {
    id: 'vegetables',
    name: 'Vegetais',
    icon: '🥬',
    foods: [
      { id: 'broccoli', name: 'Brócolis', image: '/api/placeholder/80/80' },
      { id: 'spinach', name: 'Espinafre', image: '/api/placeholder/80/80' },
      { id: 'carrots', name: 'Cenoura', image: '/api/placeholder/80/80' },
      { id: 'kale', name: 'Couve', image: '/api/placeholder/80/80' },
      { id: 'tomatoes', name: 'Tomate', image: '/api/placeholder/80/80' },
    ]
  },
  {
    id: 'fruits',
    name: 'Frutas',
    icon: '🍎',
    foods: [
      { id: 'banana', name: 'Banana', image: '/api/placeholder/80/80' },
      { id: 'apple', name: 'Maçã', image: '/api/placeholder/80/80' },
      { id: 'berries', name: 'Frutas vermelhas', image: '/api/placeholder/80/80' },
      { id: 'orange', name: 'Laranja', image: '/api/placeholder/80/80' },
      { id: 'papaya', name: 'Mamão', image: '/api/placeholder/80/80' },
    ]
  },
  {
    id: 'fats',
    name: 'Gorduras Saudáveis',
    icon: '🥑',
    foods: [
      { id: 'avocado', name: 'Abacate', image: '/api/placeholder/80/80' },
      { id: 'nuts', name: 'Castanhas', image: '/api/placeholder/80/80' },
      { id: 'olive_oil', name: 'Azeite', image: '/api/placeholder/80/80' },
      { id: 'chia', name: 'Chia', image: '/api/placeholder/80/80' },
      { id: 'flaxseed', name: 'Linhaça', image: '/api/placeholder/80/80' },
    ]
  }
]

interface PreferencesOnboardingProps {
  onComplete: () => void
}

export function PreferencesOnboarding({ onComplete }: PreferencesOnboardingProps) {
  const [selectedFoods, setSelectedFoods] = useState<Set<string>>(new Set())
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['proteins']))
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

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
    
    // Gentle haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
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

      // Save preferences to database
      const preferences = Array.from(selectedFoods).map(foodId => ({
        user_id: user.id,
        food_item_id: foodId,
        preference_level: 5 // High preference for selected items
      }))

      await supabase.from('user_preferences').insert(preferences)
      
      // Update profile to mark preferences as completed
      await supabase
        .from('profiles')
        .update({ preferences_completed: true })
        .eq('id', user.id)

      onComplete()
    } catch (error) {
      console.error('Error saving preferences:', error)
      alert('Erro ao salvar preferências. Tente novamente.')
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
                Selecione os alimentos que você mais gosta. Isso nos ajudará a criar 
                o plano alimentar perfeito para você.
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar alimentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Progress indicator */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {selectedFoods.size} alimento{selectedFoods.size !== 1 ? 's' : ''} selecionado{selectedFoods.size !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Food categories */}
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

            {/* Submit button */}
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