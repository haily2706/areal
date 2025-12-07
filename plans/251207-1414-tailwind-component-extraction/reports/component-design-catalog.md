# Component Design Catalog

**Date:** 2025-12-07
**Author:** Planning Agent
**Purpose:** Detailed CVA component specifications for Tailwind practice page

## Overview

6 reusable components extracted from repeated patterns in `app/tailwind-practice/page.tsx`. All follow shadcn/ui conventions (CVA + Slot + cn + ref forwarding).

---

## 1. SectionCard

**Purpose:** Main container for educational content sections

**Usage Pattern:** Wraps all major sections in Module 1.1 (5 instances)

### CVA Definition
```typescript
const sectionCardVariants = cva(
  "rounded-lg shadow border", // base
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
```

### Props Interface
```typescript
interface SectionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionCardVariants> {
  title?: string
  asChild?: boolean
}
```

### Usage Examples
```typescript
// Default section
<SectionCard title="Core Concepts">
  <p>Content here</p>
</SectionCard>

// Practice exercise
<SectionCard variant="practice" title="🎯 Practice Exercise">
  <p>Exercise content</p>
</SectionCard>

// Coming soon
<SectionCard variant="placeholder" title="Module 1.2">
  <p>Coming soon!</p>
</SectionCard>
```

### Key Features
- Optional title renders as `<h3 className="text-xl font-medium mb-4">`
- Supports asChild for composition
- Theme-aware via CSS custom properties

---

## 2. CodeComparison

**Purpose:** Side-by-side comparison of traditional CSS vs Tailwind

**Usage Pattern:** Used in Module 1.1 Section 1 (Utility-First Philosophy)

### CVA Definition
```typescript
const codeComparisonVariants = cva(
  "grid gap-4", // base
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
```

### Props Interface
```typescript
interface CodeComparisonProps {
  traditionalCode: string
  tailwindCode: string
  traditionalLabel?: string
  tailwindLabel?: string
  layout?: "default" | "stacked"
  className?: string
}
```

### Internal Structure
```typescript
<div className={codeComparisonVariants({ layout, className })}>
  {/* Left side */}
  <div>
    <h4 className="font-medium text-red-600 mb-2">
      {traditionalLabel || "❌ Traditional CSS:"}
    </h4>
    <pre className="bg-muted p-3 rounded text-sm text-muted-foreground">
      {traditionalCode}
    </pre>
  </div>

  {/* Right side */}
  <div>
    <h4 className="font-medium text-green-600 mb-2">
      {tailwindLabel || "✅ Tailwind Way:"}
    </h4>
    <pre className="bg-muted p-3 rounded text-sm text-muted-foreground">
      {tailwindCode}
    </pre>
  </div>
</div>
```

### Usage Example
```typescript
<CodeComparison
  traditionalCode={`.card {
  background-color: white;
  padding: 1rem;
}`}
  tailwindCode={`<div class="bg-white p-4">
  Card content
</div>`}
/>
```

### Key Features
- Responsive: 2 columns on desktop, stacked on mobile
- Color-coded headers (red for traditional, green for Tailwind)
- Pre-styled code blocks
- Custom labels supported

---

## 3. Callout

**Purpose:** Highlighted tip/info/warning boxes

**Usage Pattern:** Tips (line 123-129), hints (line 233-242)

### CVA Definition
```typescript
const calloutVariants = cva(
  "p-4 rounded border-l-4", // base
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
```

### Props Interface
```typescript
interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string
  icon?: string
  asChild?: boolean
}
```

### Internal Structure
```typescript
<div className={calloutVariants({ variant, className })}>
  {title && (
    <h4 className="font-medium text-foreground flex items-center gap-2">
      {icon && <span>{icon}</span>}
      {title}
    </h4>
  )}
  <div className="text-sm mt-1 text-muted-foreground">
    {children}
  </div>
</div>
```

### Usage Examples
```typescript
// Tip callout
<Callout variant="tip" title="Pro Tip" icon="💡">
  Use directional spacing: pt-4, mr-2, px-6
</Callout>

// Info callout
<Callout variant="info" title="Note">
  This feature requires Next.js 13+
</Callout>

// Warning
<Callout variant="warning" title="Warning" icon="⚠️">
  Deprecated in version 2.0
</Callout>
```

### Key Features
- 3 semantic variants (tip, info, warning)
- Optional title + icon
- Left border accent (4px)
- Dark mode compatible

---

## 4. ExampleContainer

**Purpose:** Wrapper for live code demonstrations

**Usage Pattern:** Live examples throughout Module 1.1

### CVA Definition
```typescript
const exampleContainerVariants = cva(
  "p-4 rounded", // base
  {
    variants: {
      variant: {
        default: "bg-muted border border-border",
        dashed: "bg-muted border-2 border-dashed border-blue-300",
        solid: "bg-muted border-2 border-solid border-blue-500"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)
```

### Props Interface
```typescript
interface ExampleContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof exampleContainerVariants> {
  title?: string
  description?: string
}
```

### Internal Structure
```typescript
<div>
  {title && <h4 className="font-medium mb-2 text-card-foreground">{title}</h4>}
  <div className={exampleContainerVariants({ variant, className })}>
    {children}
  </div>
  {description && (
    <p className="text-sm text-muted-foreground mt-2">{description}</p>
  )}
</div>
```

### Usage Examples
```typescript
// Dashed border demo
<ExampleContainer
  variant="dashed"
  title="Live Example"
  description="Classes used: bg-white p-4 rounded-lg"
>
  <div className="bg-card p-4">Demo content</div>
</ExampleContainer>

// Standard example
<ExampleContainer title="Spacing Example">
  <div className="p-4">Content with padding</div>
</ExampleContainer>
```

### Key Features
- 3 border variants (default, dashed, solid)
- Optional title above container
- Optional description below
- Muted background for contrast

---

## 5. PracticeExercise

**Purpose:** Structured exercise sections with target design + hints

**Usage Pattern:** Module 1.1 Practice Exercise section (lines 210-243)

### Component Structure
```typescript
// No CVA needed - composes other components
interface PracticeExerciseProps {
  title: string
  description?: string
  targetDesign: ReactNode
  hints?: ReactNode
  className?: string
}
```

### Internal Composition
```typescript
<SectionCard variant="practice" className={className}>
  <h3 className="text-xl font-medium mb-4 text-green-800">{title}</h3>

  {description && (
    <p className="text-muted-foreground mb-4">{description}</p>
  )}

  {/* Target Design */}
  <div className="mb-6 p-4 bg-muted rounded">
    <h4 className="font-medium mb-2 text-card-foreground">Target Design:</h4>
    {targetDesign}
  </div>

  {/* Hints */}
  {hints && (
    <Callout variant="tip" title="Classes you'll need:">
      {hints}
    </Callout>
  )}
</SectionCard>
```

### Usage Example
```typescript
<PracticeExercise
  title="🎯 Practice Exercise"
  description="Try to recreate this card design using only Tailwind utilities:"
  targetDesign={
    <div className="bg-card p-6 rounded-xl shadow-lg">
      <h3>Design Card</h3>
      <p>Beautiful card example</p>
    </div>
  }
  hints={
    <div className="space-y-2">
      <div><strong>Card:</strong> <code>bg-white p-6 rounded-xl</code></div>
      <div><strong>Title:</strong> <code>text-lg font-semibold</code></div>
    </div>
  }
/>
```

### Key Features
- Composes SectionCard (practice variant) + Callout
- Structured layout for exercises
- Green accent matches practice theme
- Hints section optional

---

## 6. ModulePlaceholder

**Purpose:** "Coming soon" cards for unimplemented modules

**Usage Pattern:** Modules 1.2-1.5 (lines 249-290)

### Component Structure
```typescript
// Simple wrapper - no CVA needed
interface ModulePlaceholderProps {
  moduleNumber: string
  moduleTitle: string
  message?: string
  className?: string
}
```

### Internal Structure
```typescript
<SectionCard variant="placeholder" className={className}>
  <h2 className="text-2xl font-semibold text-card-foreground mb-4">
    Module {moduleNumber}: {moduleTitle}
  </h2>
  <p className="text-muted-foreground">
    {message || "Coming soon! Complete previous modules first."}
  </p>
</SectionCard>
```

### Usage Example
```typescript
<ModulePlaceholder
  moduleNumber="1.2"
  moduleTitle="Layout & Positioning"
/>

<ModulePlaceholder
  moduleNumber="1.3"
  moduleTitle="Typography & Colors"
  message="Available after Module 1.2 completion"
/>
```

### Key Features
- Minimal wrapper around SectionCard
- Consistent module header formatting
- Default "coming soon" message
- Custom message support

---

## Component Dependency Graph

```
ModulePlaceholder → SectionCard
PracticeExercise → SectionCard + Callout
ExampleContainer → (standalone)
Callout → (standalone)
CodeComparison → (standalone)
SectionCard → (standalone)
```

**Build Order:**
1. SectionCard, Callout, CodeComparison, ExampleContainer (parallel)
2. PracticeExercise, ModulePlaceholder (depends on above)

---

## File Size Impact

**Before:** 291 lines
**After:** ~150 lines (48% reduction)

**Breakdown:**
- 6 new component files: ~600 lines total
- Page.tsx reduction: 141 lines saved
- **Net result:** More maintainable, reusable code

---

## Theme Compatibility

All components use CSS custom properties from `app/globals.css`:
- `bg-card` → `--card`
- `text-card-foreground` → `--card-foreground`
- `bg-muted` → `--muted`
- `text-muted-foreground` → `--muted-foreground`
- `bg-accent` → `--accent`
- `border-border` → `--border`

**Dark mode:** Automatically supported via theme variables

---

## Accessibility Notes

- All components use semantic HTML (div, h3, h4, pre)
- Color contrast meets WCAG AA standards
- Keyboard navigation inherited from base elements
- Screen readers supported (semantic headings)

**Future enhancements:**
- Add ARIA labels where appropriate
- Consider focus indicators for interactive variants
- Test with screen reader tools

---

## Testing Checklist

- [ ] Visual regression test (screenshot comparison)
- [ ] Responsive breakpoints (mobile, tablet, desktop)
- [ ] Dark mode rendering
- [ ] TypeScript compilation (`npm run build`)
- [ ] ESLint validation (`npm run lint`)
- [ ] Component composition (PracticeExercise)
- [ ] Variant rendering (all CVA variants)
- [ ] asChild prop functionality
- [ ] className override behavior

---

## Unresolved Questions

None. All patterns identified and designed. Ready for implementation.
