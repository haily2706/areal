# Component Usage Guide

Last Updated: 2025-12-07 | Version: 1.0

## Overview

This guide covers the Phase 01 component library for educational content display. All components follow the canonical pattern (CVA + Slot + cn) and support composition patterns from shadcn/ui.

## SectionCard Component

### Purpose

Educational content container with visual distinction between standard, practice, and placeholder sections.

### Location

`app/tailwind-practice/components/section-card.tsx`

### Import

```typescript
import { SectionCard } from "@/app/tailwind-practice/components/section-card"
```

### API Reference

```typescript
interface SectionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionCardVariants> {
  title?: string
  variant?: "default" | "practice" | "placeholder"
  asChild?: boolean
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "practice" \| "placeholder"` | `"default"` | Visual style variant |
| `title` | `string` | `undefined` | Section heading (renders as h3) |
| `asChild` | `boolean` | `false` | Render as custom element via Slot |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | Required | Section content |

### Examples

#### Basic Usage

```typescript
<SectionCard title="Introduction">
  <p>This is a basic section with a title and content.</p>
</SectionCard>
```

**Output**: Renders as `<section>` with title and paragraph

#### Practice Variant

```typescript
<SectionCard title="Exercise" variant="practice">
  <div className="space-y-2">
    <p>Complete this exercise:</p>
    <input type="text" placeholder="Your answer" />
  </div>
</SectionCard>
```

**Visual**: Green-bordered card for practice exercises

#### Placeholder Variant

```typescript
<SectionCard title="Coming Soon" variant="placeholder">
  <p className="text-muted-foreground">This section will be available in the next update.</p>
</SectionCard>
```

**Visual**: Muted styling for unavailable content

#### Using asChild

```typescript
<SectionCard title="Article" asChild>
  <article className="custom-class">
    <p>This renders as an article element instead of section.</p>
  </article>
</SectionCard>
```

**Note**: When using `asChild`, provide the wrapper element as child

#### With Custom Styling

```typescript
<SectionCard
  title="Styled Section"
  className="ring-2 ring-offset-2 ring-blue-500"
>
  <p>This card has additional border styling.</p>
</SectionCard>
```

### Responsive Behavior

- Mobile: Full width with padding
- Tablet: Constrained width with margin
- Desktop: Within max-w-4xl container

### Dark Mode

Colors adjust automatically:
- **Light**: White background, dark text
- **Dark**: Dark gray background, light text
- Practice variant always uses green border
- Border colors adjust for contrast

### CSS Classes Reference

```
Base:         rounded-lg shadow border
Default:      bg-card p-6 border-border
Practice:     bg-card p-6 border-2 border-green-200
Placeholder:  bg-card p-6 border-border
Title:        text-xl font-medium mb-4 text-card-foreground
```

## CodeComparison Component

### Purpose

Side-by-side comparison of traditional CSS vs Tailwind approach for teaching purposes.

### Location

`app/tailwind-practice/components/code-comparison.tsx`

### Import

```typescript
import { CodeComparison } from "@/app/tailwind-practice/components/code-comparison"
```

### API Reference

```typescript
interface CodeComparisonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeComparisonVariants> {
  traditionalCode: string
  tailwindCode: string
  traditionalLabel?: string
  tailwindLabel?: string
  layout?: "default" | "stacked"
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `traditionalCode` | `string` | Required | Traditional CSS code block |
| `tailwindCode` | `string` | Required | Tailwind CSS approach |
| `traditionalLabel` | `string` | `"❌ Traditional CSS:"` | Left column header |
| `tailwindLabel` | `string` | `"✅ Tailwind Way:"` | Right column header |
| `layout` | `"default" \| "stacked"` | `"default"` | Grid layout mode |
| `className` | `string` | `undefined` | Additional CSS classes |

### Examples

#### Basic Usage

```typescript
<CodeComparison
  traditionalCode={`
.container {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
}
  `.trim()}
  tailwindCode="flex gap-4 p-6"
/>
```

**Output**: Two-column grid on desktop, single column on mobile

#### Custom Labels

```typescript
<CodeComparison
  traditionalCode="/* CSS approach */"
  tailwindCode="/* Tailwind approach */"
  traditionalLabel="❌ Old Way"
  tailwindLabel="✅ Better Way"
/>
```

#### Stacked Layout

```typescript
<CodeComparison
  traditionalCode="..."
  tailwindCode="..."
  layout="stacked"
/>
```

**Use Case**: Force single-column layout regardless of viewport

### Responsive Behavior

- **Mobile** (< 768px): Stacked layout (1 column)
- **Tablet+** (≥ 768px): Side-by-side (2 columns)
- Auto-adjusts based on layout prop

### Color System

- **Traditional Label**: Red text (text-red-600)
- **Tailwind Label**: Green text (text-green-600)
- **Code Blocks**: Muted background (bg-muted)
- **Text**: Secondary color (text-muted-foreground)

### CSS Classes Reference

```
Grid:           grid gap-4 grid-cols-1 md:grid-cols-2
Left Header:    font-medium text-red-600 mb-2
Right Header:   font-medium text-green-600 mb-2
Code Block:     bg-muted p-3 rounded text-sm text-muted-foreground
```

### Common Use Cases

#### Displaying Responsive Patterns

```typescript
<CodeComparison
  traditionalCode={`
@media (min-width: 768px) {
  .grid { display: grid; columns: 2; }
}
  `.trim()}
  tailwindCode="grid grid-cols-1 md:grid-cols-2"
/>
```

#### Typography Examples

```typescript
<CodeComparison
  traditionalCode={`
.title {
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 2.25rem;
}
  `.trim()}
  tailwindCode="text-3xl font-semibold leading-9"
/>
```

## Callout Component

### Purpose

Highlight important information, tips, and warnings in distinct boxes with optional icons.

### Location

`app/tailwind-practice/components/callout.tsx`

### Import

```typescript
import { Callout } from "@/app/tailwind-practice/components/callout"
```

### API Reference

```typescript
interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  variant?: "tip" | "info" | "warning"
  title?: string
  icon?: string
  asChild?: boolean
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"tip" \| "info" \| "warning"` | `"tip"` | Callout type |
| `title` | `string` | `undefined` | Callout heading |
| `icon` | `string` | `undefined` | Icon emoji or symbol |
| `asChild` | `boolean` | `false` | Render as custom element |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | Required | Callout content |

### Examples

#### Tip Variant

```typescript
<Callout
  variant="tip"
  title="Pro Tip"
  icon="💡"
>
  Use utility-first design to write CSS faster and maintain consistency.
</Callout>
```

**Visual**: Yellow-bordered callout with yellow accent background

#### Info Variant

```typescript
<Callout
  variant="info"
  title="Did you know?"
  icon="ℹ️"
>
  Tailwind CSS is highly customizable through the config file.
</Callout>
```

**Visual**: Blue-bordered callout with blue background

#### Warning Variant

```typescript
<Callout
  variant="warning"
  title="Important"
  icon="⚠️"
>
  Don't apply arbitrary styles without understanding the performance impact.
</Callout>
```

**Visual**: Orange-bordered callout with orange background

#### Without Title

```typescript
<Callout variant="info" icon="ℹ️">
  This is a simple info callout with icon but no title.
</Callout>
```

#### Without Icon

```typescript
<Callout variant="warning" title="Warning">
  This is a warning without an icon.
</Callout>
```

#### Minimal Usage

```typescript
<Callout variant="tip">
  A simple tip without icon or title.
</Callout>
```

#### Using asChild

```typescript
<Callout variant="info" asChild>
  <aside className="custom-aside">
    <p>This renders as an aside element with callout styling.</p>
  </aside>
</Callout>
```

### Color System

| Variant | Border | Background | Text |
|---------|--------|-----------|------|
| `tip` | `border-yellow-500` | `bg-accent/50` | `text-muted-foreground` |
| `info` | `border-blue-500` | `bg-blue-50` / `dark:bg-blue-950/30` | `text-muted-foreground` |
| `warning` | `border-orange-500` | `bg-orange-50` / `dark:bg-orange-950/30` | `text-muted-foreground` |

### CSS Classes Reference

```
Base:       p-4 rounded border-l-4
Tip:        bg-accent/50 border-yellow-500
Info:       bg-blue-50 dark:bg-blue-950/30 border-blue-500
Warning:    bg-orange-50 dark:bg-orange-950/30 border-orange-500
Title:      font-medium text-foreground flex items-center gap-2
Icon:       inline with title
Content:    text-sm text-muted-foreground (mt-1 if title present)
```

### Semantic Usage

**Tip** (💡): Learning hints, optimization suggestions
```typescript
<Callout variant="tip" icon="💡" title="Optimization">
  Use PurgeCSS to remove unused styles from production build.
</Callout>
```

**Info** (ℹ️): Educational facts, additional context
```typescript
<Callout variant="info" icon="ℹ️" title="History">
  Tailwind CSS was created by Adam Wathan in 2017.
</Callout>
```

**Warning** (⚠️): Important cautionary notes, gotchas
```typescript
<Callout variant="warning" icon="⚠️" title="Caution">
  Avoid using !important unless absolutely necessary.
</Callout>
```

## Component Composition Patterns

### Nesting Components

```typescript
<SectionCard title="Advanced Example" variant="practice">
  <div className="space-y-4">
    <CodeComparison
      traditionalCode="..."
      tailwindCode="..."
    />
    <Callout variant="tip" icon="💡">
      Pay attention to the responsive breakpoints.
    </Callout>
  </div>
</SectionCard>
```

### Dynamic Content

```typescript
function LearningModule({ module }: { module: Module }) {
  return (
    <SectionCard title={module.title} variant={module.isLocked ? "placeholder" : "default"}>
      {module.isLocked ? (
        <p className="text-muted-foreground">Complete previous modules first.</p>
      ) : (
        <>
          <CodeComparison
            traditionalCode={module.oldCode}
            tailwindCode={module.newCode}
          />
          {module.tip && (
            <Callout variant="tip" title="Tip" icon="💡">
              {module.tip}
            </Callout>
          )}
        </>
      )}
    </SectionCard>
  )
}
```

## Testing Components

### Visual Testing Checklist

- [ ] Default state displays correctly
- [ ] All variants render with correct colors
- [ ] Text is readable (contrast ratio > 4.5:1)
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Dark mode colors display correctly
- [ ] Icons/emoji render properly
- [ ] Long content doesn't break layout

### Browser Testing

- [ ] Chrome/Edge (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen readers announce content
- [ ] Color not the only indicator
- [ ] Icons have text alternatives
- [ ] Focus states visible

## Common Patterns & Best Practices

### Always Provide Context

```typescript
// Good: Clear context
<Callout variant="warning" title="Important">
  Don't forget to optimize your bundle size.
</Callout>

// Less clear
<Callout variant="warning">
  Don't forget.
</Callout>
```

### Use Semantic Variants

```typescript
// Good: Semantic choice
<Callout variant="info" icon="ℹ️">
  This is factual information.
</Callout>

// Poor: Wrong variant
<Callout variant="warning" icon="ℹ️">
  This is just information, not a warning.
</Callout>
```

### Group Related Content

```typescript
// Good: Related items together
<SectionCard title="Topic">
  <CodeComparison ... />
  <Callout variant="tip" ... />
  <CodeComparison ... />
</SectionCard>

// Less organized
<CodeComparison ... />
<SectionCard title="Topic">
  <Callout variant="tip" ... />
</SectionCard>
<CodeComparison ... />
```

### Keep Components Focused

```typescript
// Good: Single responsibility
<CodeComparison
  traditionalCode="..."
  tailwindCode="..."
/>

// Mixing concerns
<CodeComparison>
  <Callout>Explanation</Callout>
  <CodeComparison ... />
  <OtherComponent />
</CodeComparison>
```

## Troubleshooting

### Component Not Rendering

1. Check import path is correct
2. Verify props are valid
3. Check for TypeScript errors
4. Ensure component is exported from file

### Styling Not Applied

1. Verify Tailwind CSS is configured
2. Check globals.css is imported
3. Look for conflicting CSS rules
4. Inspect in browser DevTools

### Dark Mode Not Working

1. Check `prefers-color-scheme` media query support
2. Verify CSS custom properties are defined
3. Test with system dark mode toggle
4. Check for hardcoded colors (use theme instead)

## Migration Guide

If moving components from `app/tailwind-practice/components/` to `components/ui/`:

1. **Copy** component file to `components/ui/`
2. **Update imports** in page file
3. **Test** all variants and responsive states
4. **Delete** original file from page-scoped location
5. **Update** documentation references

## References

- **Component Standards**: `/Users/lytran/Work/Learning/AReal/docs/code-standards.md`
- **System Architecture**: `/Users/lytran/Work/Learning/AReal/docs/system-architecture.md`
- **Implementation Files**: `/Users/lytran/Work/Learning/AReal/app/tailwind-practice/components/`
- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
