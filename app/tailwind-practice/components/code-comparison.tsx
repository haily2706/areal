import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const codeComparisonVariants = cva(
  "grid gap-4",
  {
    variants: {
      layout: {
        default: "grid-cols-1 md:grid-cols-2",
        stacked: "grid-cols-1"
      }
    },
    defaultVariants: {
      layout: "default"
    }
  }
)

export interface CodeComparisonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeComparisonVariants> {
  traditionalCode: string
  tailwindCode: string
  traditionalLabel?: string
  tailwindLabel?: string
}

const CodeComparison = React.forwardRef<HTMLDivElement, CodeComparisonProps>(
  ({
    className,
    layout,
    traditionalCode,
    tailwindCode,
    traditionalLabel = "❌ Traditional CSS:",
    tailwindLabel = "✅ Tailwind Way:",
    ...props
  }, ref) => {
    return (
      <div
        className={cn(codeComparisonVariants({ layout, className }))}
        ref={ref}
        {...props}
      >
        {/* Traditional CSS Side */}
        <div>
          <h4 className="font-medium text-red-600 mb-2">
            {traditionalLabel}
          </h4>
          <pre className="bg-muted p-3 rounded text-sm text-muted-foreground">
            {traditionalCode}
          </pre>
        </div>

        {/* Tailwind Way Side */}
        <div>
          <h4 className="font-medium text-green-600 mb-2">
            {tailwindLabel}
          </h4>
          <pre className="bg-muted p-3 rounded text-sm text-muted-foreground">
            {tailwindCode}
          </pre>
        </div>
      </div>
    )
  }
)
CodeComparison.displayName = "CodeComparison"

export { CodeComparison, codeComparisonVariants }
