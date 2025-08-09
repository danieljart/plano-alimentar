import React from 'react'
import { cn } from '@/lib/utils'

interface CalorieBadgeProps {
  calories: number
  className?: string
}

export function CalorieBadge({ calories, className }: CalorieBadgeProps) {
  return (
    <div className={cn(
      "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-[hsl(334_80%_65%)]",
      "text-primary-foreground text-sm font-semibold px-3 py-1 shadow-sm",
      "min-w-[60px] h-8",
      className
    )}>
      {Math.round(calories)} kcal
    </div>
  )
}