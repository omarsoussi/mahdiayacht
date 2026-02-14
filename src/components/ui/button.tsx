import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

function variantClasses(variant: ButtonProps['variant']) {
  switch (variant) {
    case 'destructive':
      return 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'
    case 'outline':
      return 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'
    case 'secondary':
      return 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80'
    case 'ghost':
      return 'hover:bg-accent hover:text-accent-foreground'
    case 'link':
      return 'text-primary underline-offset-4 hover:underline'
    default:
      return 'bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-lg'
  }
}

function sizeClasses(size: ButtonProps['size']) {
  switch (size) {
    case 'sm':
      return 'h-8 px-3 text-xs'
    case 'lg':
      return 'h-10 px-8'
    case 'icon':
      return 'h-9 w-9'
    default:
      return 'h-9 px-4 py-2'
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = 'default', size = 'default', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(base, variantClasses(variant), sizeClasses(size), className || '')}
        ref={ref as any}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
