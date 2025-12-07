# Phase 03: Migration & Cleanup

## Context

- **Parent Plan:** `plan.md`
- **Dependencies:** Phase 01 + Phase 02 complete
- **Docs:** `CLAUDE.md`

## Overview

**Date:** 2025-12-07
**Description:** Refactor page.tsx to use new components, verify consistency
**Priority:** High
**Implementation Status:** ⏳ Not Started
**Review Status:** ⏳ Pending

## Key Insights

**Current State:**
- `app/tailwind-practice/page.tsx`: 291 lines
- Heavy inline Tailwind repetition
- 5 sections in Module 1.1
- 4 placeholder modules

**Target State:**
- ~150 lines (48% reduction)
- All repeated patterns use components
- Maintain exact visual output
- Easier to extend for new modules

## Requirements

### Migration Strategy

**Phase 1 - Import Components:**
```typescript
import { SectionCard } from "@/components/ui/section-card"
import { CodeComparison } from "@/components/ui/code-comparison"
import { Callout } from "@/components/ui/callout"
import { ExampleContainer } from "@/components/ui/example-container"
import { PracticeExercise } from "@/components/ui/practice-exercise"
import { ModulePlaceholder } from "@/components/ui/module-placeholder"
```

**Phase 2 - Replace Sections (Module 1.1):**
1. Line 51-89: Utility-First Philosophy → SectionCard + CodeComparison
2. Line 92-131: Spacing System → SectionCard + ExampleContainer + Callout
3. Line 134-160: Sizing System → SectionCard + ExampleContainer
4. Line 163-207: Color System → SectionCard
5. Line 210-243: Practice Exercise → PracticeExercise

**Phase 3 - Replace Placeholders:**
- Lines 249-257: Module 1.2 → ModulePlaceholder
- Lines 260-268: Module 1.3 → ModulePlaceholder
- Lines 271-279: Module 1.4 → ModulePlaceholder
- Lines 282-290: Module 1.5 → ModulePlaceholder

## Architecture

### Before (291 lines)
```typescript
<section className="bg-card p-6 rounded-lg shadow border border-border">
  <h3 className="text-xl font-medium mb-4 text-card-foreground">...</h3>
  {/* 20+ lines of content */}
</section>
```

### After (~5 lines)
```typescript
<SectionCard title="Section Title">
  {/* content */}
</SectionCard>
```

### Line Reduction Breakdown
- 5 sections → SectionCard: ~100 lines → ~30 lines (70 saved)
- 4 placeholders: ~40 lines → ~16 lines (24 saved)
- Code comparisons: ~40 lines → ~12 lines (28 saved)
- Callouts: ~20 lines → ~8 lines (12 saved)
- **Total saved: ~134 lines**

## Related Code Files

- `app/tailwind-practice/page.tsx` (target file)
- All Phase 01 + 02 components (dependencies)

## Implementation Steps

### 1. Backup & Setup
- Create git branch: `refactor/tailwind-components`
- Take screenshot of current page (visual baseline)
- Note: Dev server should be running

### 2. Import All Components
- Add imports at top of page.tsx
- Verify no import errors

### 3. Refactor Module 1.1 Section by Section
- **Section 1** (Utility-First):
  - Replace outer section with SectionCard
  - Replace grid comparison with CodeComparison
  - Replace live example with ExampleContainer

- **Section 2** (Spacing):
  - Replace with SectionCard
  - Keep example boxes inline (educational value)
  - Replace tip with Callout variant="tip"

- **Section 3** (Sizing):
  - Replace with SectionCard
  - Keep inline examples (demonstrate width visually)

- **Section 4** (Colors):
  - Replace with SectionCard
  - Keep color examples inline (must show actual colors)

- **Section 5** (Practice):
  - Replace entire section with PracticeExercise
  - Pass target design as children
  - Move class hints to hints prop

### 4. Refactor Module Placeholders
- Replace Module1_2 with `<ModulePlaceholder moduleNumber="1.2" moduleTitle="Layout & Positioning" />`
- Replace Module1_3 with ModulePlaceholder
- Replace Module1_4 with ModulePlaceholder
- Replace Module1_5 with ModulePlaceholder

### 5. Verification
- Visual comparison: Screenshot new vs old
- Test responsive breakpoints (mobile, tablet, desktop)
- Verify dark mode still works
- Run `npm run build` (TypeScript check)
- Run `npm run lint`

### 6. Cleanup
- Remove unused inline class patterns
- Verify all imports are used
- Check for console errors/warnings

## Todo List

- [ ] Create git branch `refactor/tailwind-components`
- [ ] Take baseline screenshot of current page
- [ ] Import all 6 components in page.tsx
- [ ] Refactor Section 1 (Utility-First Philosophy)
- [ ] Refactor Section 2 (Spacing System)
- [ ] Refactor Section 3 (Sizing System)
- [ ] Refactor Section 4 (Color System)
- [ ] Refactor Section 5 (Practice Exercise)
- [ ] Refactor Module 1.2 placeholder
- [ ] Refactor Module 1.3 placeholder
- [ ] Refactor Module 1.4 placeholder
- [ ] Refactor Module 1.5 placeholder
- [ ] Visual comparison (screenshots)
- [ ] Test responsive behavior
- [ ] Test dark mode
- [ ] Run `npm run build` successfully
- [ ] Run `npm run lint` successfully

## Success Criteria

- [ ] File reduced from 291 to ~150 lines (48% reduction)
- [ ] Zero visual regressions (pixel-perfect match)
- [ ] All TypeScript errors resolved
- [ ] ESLint passes without warnings
- [ ] Responsive design works on all breakpoints
- [ ] Dark mode maintains proper theming
- [ ] Educational examples remain clear
- [ ] Components properly imported and used

## Risk Assessment

**Medium Risk:**
- Visual regressions during refactor
- Breaking responsive layout
- Educational clarity reduced

**Mitigation:**
- Incremental refactor (one section at a time)
- Screenshot comparison after each change
- Keep educational color examples inline
- Test dark mode after each section

**Rollback Plan:**
- Git branch allows easy revert
- Baseline screenshot for comparison
- Can refactor sections independently

## Security Considerations

- No security impact (static content refactor)
- TypeScript ensures type safety
- No new dependencies introduced

## Next Steps

After Phase 03 completion:
1. Mark plan as complete in plan.md
2. Document final component catalog in reports/
3. Create usage guide for future modules
4. Update CLAUDE.md with new component patterns
5. Consider adding Storybook/documentation for components
