# Code Standards & Patterns

Last Updated: 2025-12-07 | Version: 1.0

## Overview

This document defines the architectural patterns, component structure, and code standards for the AReal project (Next.js 16 + React 19 + Tailwind CSS + shadcn/ui).

## Component Architecture

### Canonical Component Pattern

All reusable UI components follow the established pattern from `components/ui/button.tsx`. This pattern ensures consistency, composability, and adherence to shadcn/ui conventions.

**Template Structure:**

```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 1. Define CVA variants
const componentVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "...",
      alternative: "..."
    },
    size: {
      default: "...",
      sm: "..."
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
})

// 2. Define typed props interface
export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  asChild?: boolean
  customProp?: string
}

// 3. Create forwarded component
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

// 4. Export component and variants
export { Component, componentVariants }
```

**Key Principles:**

1. **CVA for Variants**: Use `class-variance-authority` for all variant combinations
2. **Radix Slot**: Support `asChild` prop for component composition flexibility
3. **Ref Forwarding**: All components use `React.forwardRef` for DOM access
4. **Class Merging**: Use `cn()` utility to safely merge Tailwind classes
5. **Display Name**: Set `displayName` for debugging and React DevTools
6. **Exports**: Export both component and variants for external use

### Component Locations

**Shared UI Components** (`components/ui/`)
- Published shadcn/ui components
- Custom reusable components used across multiple routes
- Follow canonical pattern exactly
- Examples: Button, Card, Dialog, SectionCard, CodeComparison, Callout

**Page-Scoped Components** (`app/<route>/components/`)
- Components specific to a page or feature module
- Follow canonical pattern for consistency
- Can be more specialized than shared components
- Example: `app/tailwind-practice/components/section-card.tsx`

## Component Library: Phase 01 Core Components

### SectionCard

**Purpose**: Educational content container

**Location**: `app/tailwind-practice/components/section-card.tsx`

**Props**:
```typescript
interface SectionCardProps {
  variant?: "default" | "practice" | "placeholder"
  title?: string
  className?: string
  asChild?: boolean
  children: ReactNode
}
```

**Variants**:
- `default`: Standard card with border (`bg-card p-6 border border-border`)
- `practice`: Green-bordered exercise card (`border-2 border-green-200`)
- `placeholder`: Muted placeholder (`bg-card p-6 border-border`)

**Usage**:
```typescript
<SectionCard title="Topic" variant="practice">
  <p>Content here</p>
</SectionCard>
```

### CodeComparison

**Purpose**: Side-by-side code comparison widget

**Location**: `app/tailwind-practice/components/code-comparison.tsx`

**Props**:
```typescript
interface CodeComparisonProps {
  traditionalCode: string
  tailwindCode: string
  traditionalLabel?: string  // Default: "❌ Traditional CSS:"
  tailwindLabel?: string     // Default: "✅ Tailwind Way:"
  layout?: "default" | "stacked"
  className?: string
}
```

**Features**:
- Responsive grid (2 columns on desktop, 1 on mobile)
- Color-coded headers (red/green)
- Pre-styled code blocks with `bg-muted`

**Usage**:
```typescript
<CodeComparison
  traditionalCode=".container { display: flex; }"
  tailwindCode="flex"
/>
```

### Callout

**Purpose**: Highlighted information boxes (tips, warnings, info)

**Location**: `app/tailwind-practice/components/callout.tsx`

**Props**:
```typescript
interface CalloutProps {
  variant?: "tip" | "info" | "warning"
  title?: string
  icon?: string
  className?: string
  asChild?: boolean
  children: ReactNode
}
```

**Variants**:
- `tip`: Yellow border + accent background (`border-yellow-500`)
- `info`: Blue border + background (`border-blue-500 bg-blue-50 dark:bg-blue-950/30`)
- `warning`: Orange border + background (`border-orange-500 bg-orange-50 dark:bg-orange-950/30`)

**Usage**:
```typescript
<Callout variant="warning" title="Important" icon="⚠️">
  Pay attention to this information
</Callout>
```

## Styling Rules

### Tailwind CSS Only

No CSS modules or styled-components. All styling uses Tailwind utility classes.

**Good**:
```typescript
<div className="flex gap-4 rounded-lg bg-card p-6 border border-border" />
```

**Bad**:
```typescript
import styles from "./card.module.css"
<div className={styles.card} />
```

### Class Composition with `cn()`

Always use `cn()` for dynamic class merging:

```typescript
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  customClassName
)} />
```

The `cn()` utility combines clsx + tailwind-merge for safe composition.

### Theme & Color System

Colors defined as CSS custom properties in `app/globals.css`:

**Primary Colors**:
- `bg-background`: Page background
- `bg-foreground`: Text color
- `bg-card`: Card background
- `border-border`: Border color
- `bg-muted`: Disabled/secondary background

**Semantic Colors**:
- `text-destructive`: Error/dangerous actions
- `text-green-600`: Success
- `text-yellow-500`: Warning
- `text-blue-500`: Information

**Dark Mode**: Automatically applied via `dark:` prefix (default theme)

## TypeScript Guidelines

### Strict Mode

TypeScript strict mode is enabled. No `any` types without justification.

**Good**:
```typescript
interface Props {
  items: Array<{ id: string; label: string }>
  onSelect: (id: string) => void
}
```

**Avoid**:
```typescript
interface Props {
  items: any[]
  onSelect: any
}
```

### Type Inference

Use inference where types are obvious:

**Good**:
```typescript
const count = 0  // Inferred as number
const items = []  // Inferred as never[] - add type!
```

**Better**:
```typescript
const items: Array<Item> = []
```

## Naming Conventions

### Components

- **PascalCase** for component names
- Descriptive names reflecting purpose
- No generic names like `Box`, `Wrapper`

**Examples**:
- `SectionCard` ✓
- `CodeComparison` ✓
- `Callout` ✓
- `Container` ✗
- `Wrapper` ✗

### Props

- **camelCase** for prop names
- Descriptive and semantic
- Match HTML attributes when applicable

**Examples**:
```typescript
interface Props {
  variant?: "tip" | "info"    // ✓
  icon?: string               // ✓
  isActive?: boolean          // ✓
  onclick?: VoidFunction      // ✗ use onClick
  lbl?: string                // ✗ use label
}
```

### CSS Classes & Variables

- **kebab-case** for Tailwind classes (built-in)
- **camelCase** for CSS custom properties

**Examples**:
```typescript
className="flex gap-4 rounded-lg"  // ✓ Tailwind
style={{ "--custom-color": "red" }} // ✓ CSS var
const myClass = cn(...)            // ✓ JS variable
```

## File Organization

```
project-root/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles
│   ├── actions/                # Server Actions
│   │   └── feature.ts
│   └── feature/
│       ├── page.tsx            # Feature page
│       ├── components/         # Feature-specific components
│       │   ├── sub-component.tsx
│       │   └── sub-component.tsx
│       └── layout.tsx          # Feature layout (optional)
│
├── components/
│   └── ui/                     # Shared UI components
│       ├── button.tsx
│       ├── section-card.tsx
│       ├── code-comparison.tsx
│       └── callout.tsx
│
├── lib/
│   ├── utils.ts                # Helper functions
│   └── db/                     # Database (planned)
│       └── schema.ts
│
└── docs/
    ├── code-standards.md       # This file
    ├── project-overview-pdr.md
    ├── system-architecture.md
    └── ...
```

## Code Quality Checklist

Before marking work complete:

- [ ] Run `npm run lint` - passes without warnings
- [ ] Run `npm run build` - passes (includes type checking)
- [ ] TypeScript strict mode: no implicit `any`
- [ ] Components use canonical pattern (CVA + Slot + cn)
- [ ] Responsive design tested (mobile/tablet/desktop)
- [ ] Dark mode compatibility verified
- [ ] No unused imports or variables
- [ ] Descriptive commit messages

## Common Patterns

### Conditional Styling

```typescript
<div className={cn(
  "base-styles",
  isError && "text-red-600",
  isPending && "opacity-50 cursor-not-allowed",
  size === "sm" && "text-sm",
  className
)} />
```

### Responsive Design

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" />
```

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Composition with Slot

For components that need to render as different elements:

```typescript
<SectionCard asChild>
  <article className="custom-class">
    {/* Renders as <article> instead of default <section> */}
  </article>
</SectionCard>
```

## Performance Considerations

### Avoid Props Drilling

Use composition or context instead of passing props through many levels.

### Memoization

Only use `React.memo()` when you have measured performance issues.

```typescript
const ExpensiveComponent = React.memo(({ items }: Props) => {
  // Only re-renders if items prop actually changes
  return <div>{items.map(...)}</div>
})
```

### Code Splitting

Page-specific components in route directories help with automatic code splitting.

## Security Guidelines

### Server Actions

Mark functions with `"use server"` directive:

```typescript
"use server"
import { auth } from "@clerk/nextjs/server"

export async function updateItem(id: string, data: ItemData) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  // Validate input
  // Update database
  // Return result
}
```

### User Input

- Always validate input on server
- Sanitize strings before rendering (not needed with React's escaping)
- Use TypeScript for compile-time type safety

## Authentication (Clerk)

### Usage Pattern

Clerk configuration in `app/layout.tsx`:
- `ClerkProvider` wraps entire app
- Dark theme customization applied
- Global header with auth UI

### Protected Routes

Use Server Actions with auth check:

```typescript
"use server"
import { auth } from "@clerk/nextjs/server"

export async function protectedAction() {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")
  // Proceed with operation
}
```

## Testing Approach

No test harness currently configured. Manual testing includes:

- Visual regression (screenshot comparison)
- Responsive design (mobile/tablet/desktop viewports)
- Dark mode (theme toggle)
- Accessibility (keyboard navigation, screen readers)

## Known Issues & Limitations

- Database layer not yet wired (planned for Phase 02)
- No automated tests configured
- Clerk environment variables not documented (see .env.local)

## References

- **Shadcn/ui**: https://ui.shadcn.com
- **Tailwind CSS**: https://tailwindcss.com
- **CVA Documentation**: https://cva.style
- **Radix UI Slot**: https://radix-ui.com/docs/primitives/composition
- **Next.js App Router**: https://nextjs.org/docs/app

## Contributing

When adding new components:

1. Follow canonical pattern exactly
2. Place in correct location (shared vs page-scoped)
3. Write TypeScript interfaces for all props
4. Include JSDoc comments for public APIs
5. Test in multiple themes and viewports
6. Update this document if adding new patterns
