import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const calloutVariants = cva(
  "p-4 rounded border-l-4",
  {
    variants: {
      variant: {
        tip: "bg-accent/50 border-yellow-500",
        info: "bg-blue-50 dark:bg-blue-950/30 border-blue-500",
        warning: "bg-orange-50 dark:bg-orange-950/30 border-orange-500"
      }
    },
    defaultVariants: {
      variant: "tip"
    }
  }
)

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string
  icon?: string
  asChild?: boolean
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant, title, icon, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn(calloutVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {title && (
          <h4 className="font-medium text-foreground flex items-center gap-2">
            {icon && <span>{icon}</span>}
            {title}
          </h4>
        )}
        <div className={cn("text-sm text-muted-foreground", title && "mt-1")}>
          {children}
        </div>
      </Comp>
    )
  }
)
Callout.displayName = "Callout"

export { Callout, calloutVariants }
