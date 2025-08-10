import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MealAccordionProps {
  children: React.ReactNode
  className?: string
  type?: "single" | "multiple"
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

interface MealAccordionItemProps {
  children: React.ReactNode
  value: string
  className?: string
}

interface MealAccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

interface MealAccordionContentProps {
  children: React.ReactNode
  className?: string
}

const MealAccordionContext = React.createContext<{
  openValue?: string
  onValueChange?: (value: string) => void
}>({})

const MealAccordionItemContext = React.createContext<{
  value: string
  isOpen: boolean
}>({ value: "", isOpen: false })

const MealAccordion = React.forwardRef<HTMLDivElement, MealAccordionProps>(
  ({ children, className, defaultValue, value, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "")
    const currentValue = value !== undefined ? value : internalValue
    const handleValueChange = value !== undefined ? onValueChange : setInternalValue

    const handleItemToggle = React.useCallback((itemValue: string) => {
      handleValueChange?.(currentValue === itemValue ? "" : itemValue)
    }, [currentValue, handleValueChange])

    return (
      <MealAccordionContext.Provider value={{ openValue: currentValue, onValueChange: handleItemToggle }}>
        <div ref={ref} className={cn("space-y-4", className)} {...props}>
          {children}
        </div>
      </MealAccordionContext.Provider>
    )
  }
)
MealAccordion.displayName = "MealAccordion"

const MealAccordionItem = React.forwardRef<HTMLDivElement, MealAccordionItemProps>(
  ({ children, value, className, ...props }, ref) => {
    const context = React.useContext(MealAccordionContext)
    const isOpen = context.openValue === value

    return (
      <MealAccordionItemContext.Provider value={{ value, isOpen }}>
        <div
          ref={ref}
          className={cn(
            "bg-card rounded-2xl shadow-sm border transition-all duration-300 ease-out overflow-hidden",
            isOpen ? "shadow-lg ring-2 ring-primary/20" : "hover:shadow-md",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </MealAccordionItemContext.Provider>
    )
  }
)
MealAccordionItem.displayName = "MealAccordionItem"

const MealAccordionTrigger = React.forwardRef<HTMLButtonElement, MealAccordionTriggerProps>(
  ({ children, className, ...props }, ref) => {
    const accordionContext = React.useContext(MealAccordionContext)
    const itemContext = React.useContext(MealAccordionItemContext)

    return (
      <button
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between w-full p-4 min-h-[60px] text-left",
          "hover:bg-accent/50 transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        onClick={() => {
          accordionContext.onValueChange?.(itemContext.value)
          // Gentle haptic feedback
          if ('vibrate' in navigator) {
            navigator.vibrate(50)
          }
        }}
        {...props}
      >
        {children}
        <ChevronDown 
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-300 text-muted-foreground",
            itemContext.isOpen ? "rotate-180" : ""
          )} 
        />
      </button>
    )
  }
)
MealAccordionTrigger.displayName = "MealAccordionTrigger"

const MealAccordionContent = React.forwardRef<HTMLDivElement, MealAccordionContentProps>(
  ({ children, className, ...props }, ref) => {
    const itemContext = React.useContext(MealAccordionItemContext)

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          itemContext.isOpen 
            ? "animate-accordion-down" 
            : "animate-accordion-up h-0"
        )}
        {...props}
      >
        <div className={cn("px-4 pb-4 pt-0", className)}>
          {children}
        </div>
      </div>
    )
  }
)
MealAccordionContent.displayName = "MealAccordionContent"

export { 
  MealAccordion, 
  MealAccordionItem, 
  MealAccordionTrigger, 
  MealAccordionContent 
}