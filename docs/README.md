# AReal Documentation Hub

**Last Updated**: 2025-12-07
**Current Phase**: Phase 01 - Core Component Extraction (Documentation Complete)

Welcome to the AReal project documentation. This hub provides comprehensive guidance for developers, architects, and contributors.

## Quick Navigation

### For New Developers
Start here to understand the project:
1. [Project Overview & PDR](#project-overview--pdr) - Goals, requirements, roadmap
2. [Code Standards](#code-standards) - Patterns and best practices
3. [Component Usage Guide](#component-usage-guide) - How to use Phase 01 components

### For Architects
Understand the system design:
1. [System Architecture](#system-architecture) - Layers, data flow, design patterns
2. [Project Overview & PDR](#project-overview--pdr) - Requirements and constraints

### For Component Developers
Build new components:
1. [Code Standards](#code-standards) - Canonical pattern (CVA + Slot + cn)
2. [Component Usage Guide](#component-usage-guide) - Examples and API reference
3. [System Architecture](#system-architecture) - How components fit in the system

---

## Documentation Files

### Project Overview & PDR
**File**: `project-overview-pdr.md`
**Purpose**: Define project goals, technical requirements, and phasing
**Audience**: Everyone (especially new team members)
**Key Sections**:
- Executive summary
- Project goals and success metrics
- Technology stack
- Functional and non-functional requirements
- Phasing roadmap (Phase 01-04)
- Risk management
- Constraints and assumptions

**Start Here If**: You need to understand what the project is building and why

---

### Code Standards
**File**: `code-standards.md`
**Purpose**: Establish consistent code patterns and standards
**Audience**: Developers (required reading before contributing)
**Key Sections**:
- Canonical component pattern (CVA + Slot + cn + forwardRef)
- Component locations (shared vs page-scoped)
- Styling rules and Tailwind conventions
- TypeScript guidelines
- Naming conventions
- File organization
- Code quality checklist

**Start Here If**: You're writing components or reviewing code

---

### System Architecture
**File**: `system-architecture.md`
**Purpose**: Document technical architecture and design decisions
**Audience**: Architects and senior developers
**Key Sections**:
- Architecture overview (layered design)
- Component architecture and patterns
- Data flow (rendering, interactivity, auth)
- Styling system (theme, responsive, dark mode)
- Error handling and security
- Performance optimization
- Deployment and monitoring (planned)

**Start Here If**: You need to understand how the system works

---

### Component Usage Guide
**File**: `component-usage-guide.md`
**Purpose**: Practical guide for using Phase 01 components
**Audience**: Developers using components in pages
**Key Sections**:
- SectionCard API and examples
- CodeComparison API and examples
- Callout API and examples
- Component composition patterns
- Testing checklists
- Best practices
- Troubleshooting

**Start Here If**: You're building pages with Phase 01 components

---

## Phase 01 Components Summary

### SectionCard
**Purpose**: Container for educational content sections
**Location**: `app/tailwind-practice/components/section-card.tsx`
**Variants**: default, practice, placeholder
**Props**: title, variant, className, asChild

**Usage**:
```typescript
<SectionCard title="Topic" variant="practice">
  <p>Content here</p>
</SectionCard>
```

### CodeComparison
**Purpose**: Side-by-side comparison of traditional CSS vs Tailwind
**Location**: `app/tailwind-practice/components/code-comparison.tsx`
**Responsive**: 2-column desktop, 1-column mobile

**Usage**:
```typescript
<CodeComparison
  traditionalCode="...CSS..."
  tailwindCode="...utility classes..."
/>
```

### Callout
**Purpose**: Highlight tips, info, and warnings
**Location**: `app/tailwind-practice/components/callout.tsx`
**Variants**: tip, info, warning
**Props**: title, icon, variant, className, asChild

**Usage**:
```typescript
<Callout variant="warning" title="Important" icon="⚠️">
  Important information here
</Callout>
```

---

## Key Architectural Patterns

### Canonical Component Pattern
All UI components follow this pattern:

```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const variants = cva("base-classes", {
  variants: { variant: { default: "...", alt: "..." } },
  defaultVariants: { variant: "default" }
})

export interface Props extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof variants> {
  asChild?: boolean
}

const Component = React.forwardRef<HTMLDivElement, Props>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return <Comp className={cn(variants({ variant, className }))} ref={ref} {...props} />
  }
)
Component.displayName = "Component"

export { Component, variants }
```

**Key Principles**:
- Use CVA for variants
- Support `asChild` for composition
- Use `cn()` for class merging
- Forward refs for DOM access
- Export both component and variants

### Tailwind-First Styling
- All styling via Tailwind utility classes
- No CSS modules or styled-components
- Dynamic classes via `cn()` utility
- Theme variables via CSS custom properties
- Dark mode via `dark:` prefix

---

## Development Workflow

### Before Writing Code
1. Read `code-standards.md` for component patterns
2. Check `component-usage-guide.md` for existing components
3. Review `CLAUDE.md` for project-specific guidelines

### When Building Components
1. Follow canonical pattern from `code-standards.md`
2. Use CVA for variants
3. Support `asChild` where applicable
4. Export both component and variants
5. Test all variants and responsive states
6. Update documentation

### Code Quality
- Run `npm run lint` - must pass
- Run `npm run build` - must pass (includes type checking)
- Test responsive design (mobile/tablet/desktop)
- Verify dark mode compatibility
- Check TypeScript strict mode compliance

---

## Directory Structure

```
/Users/lytran/Work/Learning/AReal/
├── docs/
│   ├── README.md                      (This file)
│   ├── code-standards.md              (Component patterns & standards)
│   ├── project-overview-pdr.md        (Goals, requirements, roadmap)
│   ├── system-architecture.md         (Technical architecture)
│   ├── component-usage-guide.md       (API reference & examples)
│   └── screenshots/                   (Design screenshots)
│
├── app/
│   ├── layout.tsx                     (Root layout + ClerkProvider)
│   ├── page.tsx                       (Homepage)
│   ├── globals.css                    (Global styles & theme)
│   └── tailwind-practice/
│       ├── page.tsx                   (Educational content)
│       └── components/                (Page-scoped components)
│           ├── section-card.tsx
│           ├── code-comparison.tsx
│           └── callout.tsx
│
├── components/
│   └── ui/                            (Shared UI components)
│       └── button.tsx
│
├── lib/
│   ├── utils.ts                       (cn() helper)
│   └── db/                            (Database - planned)
│
├── plans/                             (Project plans & phases)
│   ├── 251207-1414-tailwind-component-extraction/
│   │   ├── plan.md
│   │   ├── phase-01-core-components.md
│   │   └── reports/
│   └── reports/
│       └── 251207-phase01-completion-documentation-update.md
│
├── CLAUDE.md                          (Project guidelines)
└── README.md                          (Project root)
```

---

## Phase Roadmap

### Phase 01: Core Component Extraction ✅ Complete
**Duration**: 2025-12-07
**Deliverables**:
- SectionCard component
- CodeComparison component
- Callout component
- Documentation suite (this documentation)

### Phase 02: Specialized Components (Planned)
**Focus**: Advanced layout and interactive components

### Phase 03: Database Integration (Planned)
**Focus**: Drizzle ORM setup, data persistence

### Phase 04: User Features (Planned)
**Focus**: Protected routes, dashboards, progress tracking

---

## Getting Started

### For Reading Documentation
1. Start with `project-overview-pdr.md` for context
2. Read `code-standards.md` for patterns
3. Reference `component-usage-guide.md` when building pages
4. Consult `system-architecture.md` for design questions

### For Building Features
1. Check `code-standards.md` for component pattern
2. Use Phase 01 components as reference
3. Follow naming conventions from `code-standards.md`
4. Test all variants and responsive states
5. Run `npm run build && npm run lint` before committing

### For Debugging
1. Check troubleshooting section in `component-usage-guide.md`
2. Verify component props in `system-architecture.md`
3. Review examples in relevant docs
4. Check `code-standards.md` for common patterns

---

## Common Questions

**Q: Where do I put new components?**
A: Shared components in `components/ui/`, page-specific in `app/*/components/`. See `code-standards.md` for details.

**Q: How do I create a new component?**
A: Follow the canonical pattern in `code-standards.md`. Use CVA for variants, Slot for asChild, cn() for classes.

**Q: What's the component API?**
A: Check `component-usage-guide.md` for full API reference including examples.

**Q: How do I style components?**
A: Use Tailwind utility classes only. No CSS modules or styled-components. See `code-standards.md` styling rules.

**Q: How do I handle dark mode?**
A: Define colors in CSS custom properties and use `dark:` prefix. See `system-architecture.md` styling system.

**Q: Where's the authentication code?**
A: Clerk is configured in `app/layout.tsx`. Server Actions in `app/actions/`. See `system-architecture.md` for details.

---

## Useful Resources

### Internal Documentation
- **CLAUDE.md**: Project-specific guidelines and patterns
- **plans/**: Phase plans and implementation details
- **plans/reports/**: Phase completion and review reports

### External References
- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
- **CVA**: https://cva.style
- **Clerk**: https://clerk.com/docs

---

## Contributing to Documentation

When updating documentation:

1. **Keep it accurate**: Verify against actual code
2. **Keep it current**: Update when features change
3. **Keep it clear**: Sacrifice grammar for clarity
4. **Keep it organized**: Use consistent structure
5. **Keep it linked**: Cross-reference related sections
6. **Keep it discoverable**: Update this README when adding docs

---

## Document Versions

| Document | Version | Last Updated | Status |
|----------|---------|--------------|--------|
| code-standards.md | 1.0 | 2025-12-07 | Complete |
| project-overview-pdr.md | 1.0 | 2025-12-07 | Complete |
| system-architecture.md | 1.0 | 2025-12-07 | Complete |
| component-usage-guide.md | 1.0 | 2025-12-07 | Complete |
| README.md | 1.0 | 2025-12-07 | Complete |

---

## Quick Links

- **Project Root**: `/Users/lytran/Work/Learning/AReal`
- **Documentation**: `/Users/lytran/Work/Learning/AReal/docs`
- **Phase 01 Plan**: `/Users/lytran/Work/Learning/AReal/plans/251207-1414-tailwind-component-extraction`
- **Components**: `/Users/lytran/Work/Learning/AReal/app/tailwind-practice/components`
- **Project Guidelines**: `/Users/lytran/Work/Learning/AReal/CLAUDE.md`

---

## Support

For questions or clarifications:
1. Check the relevant documentation file
2. Review code examples in the component
3. Consult CLAUDE.md for project-specific guidance
4. Check phase plans for context

---

**Documentation Generated**: 2025-12-07
**Status**: Phase 01 Documentation Suite Complete
**Next Update**: Phase 02 component documentation
