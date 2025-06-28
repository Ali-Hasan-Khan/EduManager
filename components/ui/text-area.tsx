import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "filled" | "outline"
  size?: "sm" | "md" | "lg"
  resize?: "none" | "vertical" | "horizontal" | "both"
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    variant = "default", 
    size = "md", 
    resize = "vertical",
    ...props 
  }, ref) => {
    const variantClasses = {
      default: "border-input bg-background",
      filled: "border-transparent bg-muted/50",
      outline: "border-2 border-input bg-transparent"
    }

    const sizeClasses = {
      sm: "min-h-[60px] px-2 py-1.5 text-xs",
      md: "min-h-[80px] px-3 py-2 text-sm", 
      lg: "min-h-[120px] px-4 py-3 text-base"
    }

    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x", 
      both: "resize"
    }

    return (
      <textarea
        className={cn(
          "flex w-full rounded-md shadow-sm transition-all duration-200",
          "placeholder:text-muted-foreground/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
          "dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800",
          variantClasses[variant],
          sizeClasses[size],
          resizeClasses[resize],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }