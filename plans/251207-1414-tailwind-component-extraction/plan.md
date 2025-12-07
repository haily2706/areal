# Tailwind Practice Page - Component Extraction Plan

**Created:** 2025-12-07 14:14
**Status:** Planning
**Active Plan:** `plans/251207-1414-tailwind-component-extraction`

## Overview

Extract reusable components from `app/tailwind-practice/page.tsx` using CVA patterns to reduce duplication while maintaining educational clarity.

## Current State

- **File:** `app/tailwind-practice/page.tsx` (291 lines)
- **Pattern:** Educational Tailwind CSS modules with inline classes
- **Issues:** Heavy repetition of card sections, code comparisons, callouts, examples
- **No component abstraction** - all styling is inline

## Identified Patterns

1. **Section Card** - Repeats 5x in Module 1.1 alone
2. **Code Comparison Block** - Side-by-side traditional vs Tailwind
3. **Callout Box** - Tips with left border accent
4. **Example Container** - Live demo boxes with dashed borders
5. **Module Placeholder** - Coming soon cards for Modules 1.2-1.5

## Implementation Phases

### Phase 01: Core Components
**File:** `phase-01-core-components.md`
**Status:** ✅ Complete
**Progress:** 100%
**Completed:** 2025-12-07 14:31

Create base educational components:
- `SectionCard` - Main content container
- `CodeComparison` - Side-by-side code blocks
- `Callout` - Tip/warning boxes

### Phase 02: Specialized Components
**File:** `phase-02-specialized-components.md`
**Status:** ⏳ Pending
**Progress:** 0%

Build domain-specific components:
- `ExampleContainer` - Live demo wrapper
- `PracticeExercise` - Exercise section with solutions
- `ModulePlaceholder` - Coming soon cards

### Phase 03: Migration & Cleanup
**File:** `phase-03-migration-cleanup.md`
**Status:** ⏳ Pending
**Progress:** 0%

Refactor existing code:
- Replace inline patterns with components
- Verify visual consistency
- Test responsiveness
- Update documentation

## Key Principles

- **Follow shadcn/ui pattern:** CVA + Slot + cn + ref forwarding
- **YAGNI:** Only extract truly repeated patterns
- **Educational clarity:** Components should enhance, not obscure learning
- **Theme support:** Work with light/dark modes
- **TypeScript strict mode:** Proper typing throughout

## Success Metrics

- [ ] Reduce file from 291 to ~150 lines
- [ ] All components follow project conventions
- [ ] No visual regressions
- [ ] Components reusable across future modules
- [ ] TypeScript builds without errors

## References

- **Project pattern:** `components/ui/button.tsx`
- **Source file:** `app/tailwind-practice/page.tsx`
- **Utilities:** `lib/utils.ts` (cn function)
