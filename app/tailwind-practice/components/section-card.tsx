import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sectionCardVariants = cva(
  "rounded-lg shadow border",
  {
    variants: {
      variant: {
        default: "bg-card p-6 border-border",
        practice: "bg-card p-6 border-2 border-green-200",
        placeholder: "bg-card p-6 border-border"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface SectionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionCardVariants> {
  title?: string
  asChild?: boolean
}

const SectionCard = React.forwardRef<HTMLDivElement, SectionCardProps>(
  ({ className, variant, title, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "section"
    return (
      <Comp
        className={cn(sectionCardVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {title && (
          <h3 className="text-xl font-medium mb-4 text-card-foreground">
            {title}
          </h3>
        )}
        {children}
      </Comp>
    )
  }
)
SectionCard.displayName = "SectionCard"

export { SectionCard, sectionCardVariants }
