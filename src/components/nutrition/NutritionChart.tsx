import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { NutritionData } from '@/data/nutrition'

interface NutritionChartProps {
  nutrition: NutritionData
  className?: string
}

const COLORS = {
  protein: 'hsl(334, 80%, 55%)',     // Primary pink
  carbs: 'hsl(334, 60%, 70%)',      // Secondary pink  
  fat: 'hsl(334, 40%, 85%)',        // Light pink
}

export function NutritionChart({ nutrition, className }: NutritionChartProps) {
  // Calculate calories from macros (protein & carbs = 4 cal/g, fat = 9 cal/g)
  const proteinCals = nutrition.protein * 4
  const carbsCals = nutrition.carbs * 4  
  const fatCals = nutrition.fat * 9
  const totalMacroCals = proteinCals + carbsCals + fatCals

  const data = [
    {
      name: 'Proteínas',
      value: proteinCals,
      percentage: totalMacroCals > 0 ? Math.round((proteinCals / totalMacroCals) * 100) : 0,
      grams: Math.round(nutrition.protein)
    },
    {
      name: 'Carboidratos', 
      value: carbsCals,
      percentage: totalMacroCals > 0 ? Math.round((carbsCals / totalMacroCals) * 100) : 0,
      grams: Math.round(nutrition.carbs)
    },
    {
      name: 'Gorduras',
      value: fatCals, 
      percentage: totalMacroCals > 0 ? Math.round((fatCals / totalMacroCals) * 100) : 0,
      grams: Math.round(nutrition.fat)
    }
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-card-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.grams}g ({data.percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className={className}>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: Object.values(COLORS)[index] }}
              />
              <span className="text-foreground">{item.name}</span>
            </div>
            <span className="text-muted-foreground font-medium">
              {item.grams}g ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}