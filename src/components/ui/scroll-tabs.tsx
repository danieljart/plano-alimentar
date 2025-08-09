import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollTabsProps {
  children: React.ReactNode
  className?: string
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

interface ScrollTabsListProps {
  children: React.ReactNode
  className?: string
}

interface ScrollTabsTriggerProps {
  children: React.ReactNode
  value: string
  className?: string
}

interface ScrollTabsContentProps {
  children: React.ReactNode
  value: string
  className?: string
}

const ScrollTabsContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

const ScrollTabs = React.forwardRef<HTMLDivElement, ScrollTabsProps>(
  ({ children, className, defaultValue, value, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "")
    const currentValue = value !== undefined ? value : internalValue
    const handleValueChange = value !== undefined ? onValueChange : setInternalValue

    return (
      <ScrollTabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </ScrollTabsContext.Provider>
    )
  }
)
ScrollTabs.displayName = "ScrollTabs"

const ScrollTabsList = React.forwardRef<HTMLDivElement, ScrollTabsListProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-start overflow-x-auto pb-2 pt-1 px-1",
          "scrollbar-hide scroll-smooth",
          className
        )}
        {...props}
      >
        <div className="flex gap-1 min-w-max">
          {children}
        </div>
      </div>
    )
  }
)
ScrollTabsList.displayName = "ScrollTabsList"

const ScrollTabsTrigger = React.forwardRef<HTMLButtonElement, ScrollTabsTriggerProps>(
  ({ children, value, className, ...props }, ref) => {
    const context = React.useContext(ScrollTabsContext)
    const isActive = context.value === value

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 min-w-[80px] max-w-[120px]",
          "text-sm font-semibold transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          isActive 
            ? "bg-gradient-to-r from-primary to-[hsl(334_80%_65%)] text-primary-foreground shadow-lg scale-105" 
            : "text-primary hover:bg-accent hover:text-accent-foreground hover:scale-105",
          className
        )}
        onClick={() => {
          context.onValueChange?.(value)
          // Gentle haptic feedback
          if ('vibrate' in navigator) {
            navigator.vibrate(50)
          }
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)
ScrollTabsTrigger.displayName = "ScrollTabsTrigger"

const ScrollTabsContent = React.forwardRef<HTMLDivElement, ScrollTabsContentProps>(
  ({ children, value, className, ...props }, ref) => {
    const context = React.useContext(ScrollTabsContext)
    const isActive = context.value === value

    if (!isActive) return null

    return (
      <div
        ref={ref}
        className={cn(
          "mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "animate-in fade-in-50 duration-300",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ScrollTabsContent.displayName = "ScrollTabsContent"

export { ScrollTabs, ScrollTabsList, ScrollTabsTrigger, ScrollTabsContent }