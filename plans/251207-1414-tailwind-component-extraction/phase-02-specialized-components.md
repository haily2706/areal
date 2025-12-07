# Phase 02: Specialized Educational Components

## Context

- **Parent Plan:** `plan.md`
- **Dependencies:** Phase 01 (core components must be complete)
- **Docs:** `CLAUDE.md`

## Overview

**Date:** 2025-12-07
**Description:** Build domain-specific components for educational examples
**Priority:** Medium
**Implementation Status:** ⏳ Not Started
**Review Status:** ⏳ Pending

## Key Insights

**Pattern Analysis:**

1. **ExampleContainer** (lines 82-87, 104-108, 113-119)
   - Dashed border variant: `border-2 border-dashed border-blue-300`
   - Used for live demonstrations
   - Contains demo + description

2. **PracticeExercise** (lines 210-243)
   - Complex structure: target design + hints
   - Uses nested SectionCard (green border)
   - Contains reference solution + class list

3. **ModulePlaceholder** (lines 249-257, 260-268, 271-279, 282-290)
   - Simple card with title + "Coming soon" message
   - Reuses SectionCard with muted styling
   - Minimal but repeated 4 times

## Requirements

### ExampleContainer Component

**API Design:**
```typescript
interface ExampleContainerProps {
  title?: string
  description?: string
  variant?: "default" | "dashed" | "solid"
  children: ReactNode
  className?: string
}
```

**CVA Variants:**
- `default`: Standard border
- `dashed`: Blue dashed border for demos
- `solid`: Solid border for reference examples

### PracticeExercise Component

**API Design:**
```typescript
interface PracticeExerciseProps {
  title: string
  description?: string
  targetDesign: ReactNode
  hints?: ReactNode
  className?: string
}
```

**Features:**
- Composed using SectionCard (practice variant)
- Accepts target design as children
- Optional hints section with yellow accent

### ModulePlaceholder Component

**API Design:**
```typescript
interface ModulePlaceholderProps {
  moduleNumber: string
  moduleTitle: string
  message?: string
  className?: string
}
```

**Default message:** "Coming soon! Complete previous modules first."

## Architecture

### File Structure
```
components/ui/
├── example-container.tsx      # Live demo wrapper
├── practice-exercise.tsx      # Exercise sections
└── module-placeholder.tsx     # Coming soon cards
```

### Component Composition

**PracticeExercise uses:**
- SectionCard (from Phase 01)
- Callout (from Phase 01) for hints
- ExampleContainer for target design

**Benefits:**
- Consistent styling across exercise types
- Reusable across future modules
- Easy to extend with new exercise variants

## Related Code Files

- `app/tailwind-practice/page.tsx:210-243` (practice exercise)
- `app/tailwind-practice/page.tsx:82-87` (example containers)
- `app/tailwind-practice/page.tsx:249-290` (placeholders)
- `components/ui/section-card.tsx` (dependency from Phase 01)
- `components/ui/callout.tsx` (dependency from Phase 01)

## Implementation Steps

### 1. ExampleContainer Component
- Create `components/ui/example-container.tsx`
- Define CVA variants (default, dashed, solid)
- Base: `bg-muted p-4 rounded`
- Border variants: `border-2 border-dashed border-blue-300`
- Optional title + description layout

### 2. PracticeExercise Component
- Create `components/ui/practice-exercise.tsx`
- Compose with SectionCard (practice variant)
- Accept targetDesign as ReactNode
- Optional hints using Callout component
- Title with exercise icon (🎯)

### 3. ModulePlaceholder Component
- Create `components/ui/module-placeholder.tsx`
- Simple wrapper around SectionCard
- Muted text color for "coming soon"
- Module number + title formatting
- Default message prop

### 4. Integration Testing
- Replace example containers in Module 1.1
- Replace practice exercise section
- Replace Module 1.2-1.5 placeholders
- Verify visual consistency
- Test component composition

## Todo List

- [ ] Create `components/ui/example-container.tsx` with border variants
- [ ] Create `components/ui/practice-exercise.tsx` using SectionCard
- [ ] Create `components/ui/module-placeholder.tsx`
- [ ] Test ExampleContainer with different variants
- [ ] Test PracticeExercise with/without hints
- [ ] Test ModulePlaceholder rendering
- [ ] Verify component composition works correctly

## Success Criteria

- [ ] ExampleContainer renders with dashed/solid borders correctly
- [ ] PracticeExercise composes SectionCard + Callout properly
- [ ] ModulePlaceholder reduces 4 duplicate sections to 1 component
- [ ] All components follow project TypeScript standards
- [ ] Visual output matches original exactly
- [ ] Components are reusable for future modules

## Risk Assessment

**Medium Risk:**
- PracticeExercise complexity (nested components)
- Component composition may break styling
- Border variant colors must match exactly

**Mitigation:**
- Test composition in isolation first
- Use exact Tailwind classes from source
- Verify CSS custom properties work in dark mode

## Security Considerations

- No security concerns (static educational content)
- TypeScript provides type safety
- No user input or dynamic content

## Next Steps

After Phase 02 completion:
1. Proceed to Phase 03 (migration & cleanup)
2. Document component composition patterns
3. Update plan.md with progress
