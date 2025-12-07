# Project Overview & Product Development Requirements

Last Updated: 2025-12-07 | Version: 1.0

## Executive Summary

**AReal** is a Next.js 16 application designed as an AI-powered flashcard application. The project combines modern web technologies (Next.js 16, React 19, Tailwind CSS) with enterprise-grade UI patterns (shadcn/ui, CVA, Radix UI) to deliver an accessible, performant, and maintainable educational platform.

**Current Phase**: Phase 01 - Core Component Extraction (Complete)
**Development Status**: Active - Foundation established, components extracted

## Project Goals

### Primary Goals

1. **Educational Value**: Build an interactive flashcard application for learning
2. **Component Extraction**: Extract reusable educational components from inline patterns
3. **Maintainability**: Establish clear patterns for consistent component development
4. **Accessibility**: Ensure all components are accessible (WCAG 2.1 AA)
5. **Performance**: Optimize for fast page loads and smooth interactions

### Success Metrics

- All UI components follow canonical pattern (CVA + Slot + cn)
- Zero TypeScript errors in strict mode
- Responsive design tested on mobile/tablet/desktop
- Dark mode fully functional across all components
- Component test coverage in page demonstrations

## Technical Architecture

### Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Next.js | 16 | App Router, SSR, file-based routing |
| **UI Library** | React | 19 | Component rendering, hooks |
| **Styling** | Tailwind CSS | v4 | Utility-first CSS framework |
| **Components** | shadcn/ui | Latest | Pre-built accessible components |
| **Authentication** | Clerk | Latest | User auth, session management |
| **Database** | PostgreSQL (Neon) | - | Planned for Phase 02 |
| **ORM** | Drizzle | Latest | Type-safe database queries (planned) |
| **Utilities** | CVA, Radix UI, clsx | Latest | Variant management, composition |

### Architecture Layers

```
┌─────────────────────────────────────┐
│  Pages (app/**/page.tsx)            │  User-facing routes
├─────────────────────────────────────┤
│  Components                         │  Reusable UI building blocks
│  ├── Shared (components/ui/)        │  Used across multiple pages
│  └── Page-scoped (app/*/components/)│  Feature-specific components
├─────────────────────────────────────┤
│  Server Actions (app/actions/)      │  Backend operations, auth check
├─────────────────────────────────────┤
│  Utilities & Types (lib/)           │  Helpers, type definitions
├─────────────────────────────────────┤
│  Database Layer (lib/db/)           │  Schema, queries (planned)
└─────────────────────────────────────┘
```

### Current Directory Structure

```
/Users/lytran/Work/Learning/AReal/
├── app/
│   ├── layout.tsx                    # Root layout + ClerkProvider
│   ├── page.tsx                      # Homepage
│   ├── globals.css                   # Global styles & theme
│   ├── actions/                      # Server Actions (planned)
│   └── tailwind-practice/
│       ├── page.tsx                  # Tailwind learning module
│       ├── components/               # Page-scoped components
│       │   ├── section-card.tsx      # Content container
│       │   ├── code-comparison.tsx   # Side-by-side code view
│       │   └── callout.tsx           # Info/warning boxes
│
├── components/
│   └── ui/                           # Shared UI components
│       └── button.tsx                # Example canonical component
│
├── lib/
│   ├── utils.ts                      # cn() helper
│   └── db/                           # Database (planned)
│       └── schema.ts
│
├── docs/
│   ├── code-standards.md             # Component patterns
│   ├── project-overview-pdr.md       # This file
│   ├── system-architecture.md        # Technical details
│   ├── codebase-summary.md           # Codebase overview
│   └── design-guidelines.md          # UI/UX standards
│
└── plans/
    ├── 251207-1414-tailwind-component-extraction/
    │   ├── plan.md                   # Plan overview
    │   ├── phase-01-core-components.md
    │   └── reports/                  # Phase reviews
    └── PLAN_TEMPLATE.md
```

## Functional Requirements

### Core Requirements

#### FR-001: Educational Content Display

**Description**: Application displays structured educational content in modules

**Acceptance Criteria**:
- [ ] Page displays multiple learning modules
- [ ] Modules organized by topic (Core Concepts, Layout, Typography, etc.)
- [ ] Module selector functional
- [ ] Content properly formatted with headers and sections

#### FR-002: Code Comparison Widget

**Description**: Side-by-side comparison of traditional CSS vs Tailwind approach

**Acceptance Criteria**:
- [ ] Two-column layout on desktop, stacked on mobile
- [ ] Traditional CSS code highlighted in red
- [ ] Tailwind code highlighted in green
- [ ] Responsive to viewport changes

#### FR-003: Component Library

**Description**: Reusable components for educational content

**Acceptance Criteria**:
- [ ] SectionCard component with 3 variants
- [ ] CodeComparison component with responsive layout
- [ ] Callout component with 3 warning types
- [ ] All components follow canonical pattern
- [ ] Components properly typed in TypeScript

#### FR-004: User Authentication

**Description**: Secure user authentication via Clerk

**Acceptance Criteria**:
- [ ] Sign in/Sign up flows available
- [ ] User profile accessible
- [ ] Session persists across page reloads
- [ ] Logout functionality works

### Non-Functional Requirements

#### NFR-001: Performance

**Requirements**:
- [ ] Initial page load < 3 seconds
- [ ] Code splitting for page-specific components
- [ ] Optimized image loading
- [ ] No layout shift during component rendering
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

#### NFR-002: Accessibility

**Requirements**:
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation support
- [ ] Screen reader compatible
- [ ] Color contrast ratios > 4.5:1
- [ ] Semantic HTML structure

#### NFR-003: Maintainability

**Requirements**:
- [ ] Components follow single responsibility principle
- [ ] Clear separation of concerns
- [ ] Comprehensive documentation
- [ ] Type-safe code (TypeScript strict mode)
- [ ] Consistent naming conventions

#### NFR-004: Responsive Design

**Requirements**:
- [ ] Mobile: 320px - 767px
- [ ] Tablet: 768px - 1023px
- [ ] Desktop: 1024px+
- [ ] Touch-friendly tap targets (48px minimum)
- [ ] Dark mode fully functional

#### NFR-005: Browser Support

**Requirements**:
- [ ] Chrome/Edge 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Mobile browsers (latest 2 versions)

## Design Philosophy

### Component-First Approach

- Build reusable, composable components
- Follow shadcn/ui patterns (CVA + Slot + cn)
- Maintain consistent API across components
- Support composition via `asChild` prop

### Utility-First Styling

- Tailwind CSS for all styling
- No CSS modules or CSS-in-JS
- Semantic color tokens (background, foreground, etc.)
- Dark mode via `dark:` prefix

### Progressive Enhancement

- Start with static content
- Add interactivity via client components
- Use Server Actions for data operations
- Graceful degradation for unsupported features

## Phasing & Roadmap

### Phase 01: Core Component Extraction (Current)

**Status**: Complete (85%)
**Duration**: 2025-12-07
**Deliverables**:
- SectionCard component
- CodeComparison component
- Callout component
- Documentation updates

**Outstanding Items**:
- Move components to canonical location (components/ui/)
- Browser testing for dark mode
- Phase completion validation

### Phase 02: Specialized Components (Planned)

**Estimated**: Q4 2025
**Focus**:
- Advanced layout components
- Interactive quiz components
- Progress tracking UI
- User profile components

### Phase 03: Database Integration (Planned)

**Estimated**: Q1 2026
**Focus**:
- Drizzle ORM setup
- User data persistence
- Flashcard management
- Progress tracking backend

### Phase 04: Authentication & User Features (Planned)

**Estimated**: Q1 2026
**Focus**:
- Protected routes
- User settings
- Progress dashboard
- Social features

## Risk Management

### Technical Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|-----------|
| Component pattern inconsistency | Medium | Low | Code standards doc + reviews |
| TypeScript strict mode blockers | High | Medium | Regular type checking |
| Dark mode color issues | Medium | Low | Comprehensive testing |
| Responsive layout breaks | Medium | Medium | Mobile-first testing |

### Project Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|-----------|
| Scope creep | High | Medium | Clear phase boundaries |
| Dependency updates break build | High | Low | Pinned versions, testing |
| Knowledge silos | Medium | Medium | Documentation + pair reviews |

## Success Criteria

### Phase 01 Completion

- [x] All 3 components implemented and tested
- [x] TypeScript strict mode passes
- [x] Components follow canonical pattern
- [ ] All components in canonical location (components/ui/)
- [ ] Dark mode tested and working
- [ ] Documentation complete and accurate

### Overall Project Success

- 100% of components follow established patterns
- Zero TypeScript errors in strict mode
- Responsive design on all target viewports
- Accessibility compliance (WCAG 2.1 AA)
- Performance metrics within targets
- Complete documentation of all features
- Test coverage > 80%

## Constraints & Assumptions

### Constraints

- **No test framework**: Manual testing only (TestRunner/Vitest not configured)
- **Database not ready**: Phase 01-02 are UI-only
- **No CI/CD automated**: Deployment manual
- **Single-user development**: No complex merge conflict patterns

### Assumptions

- Next.js 16 stays stable (no major version upgrades during Phase 01-02)
- Clerk integration remains available and compatible
- Tailwind CSS v4 PostCSS configuration sufficient
- Dark mode preference via system settings (no user toggle needed yet)
- Educational content is static (no CMS planned)

## Dependencies

### External Services

- **Clerk**: User authentication and session management
- **Neon**: PostgreSQL database (Phase 03+)
- **npm Registry**: Package dependencies

### Internal Dependencies

- **lib/utils.ts**: `cn()` helper required by all components
- **app/globals.css**: Theme variables and global styles
- **TypeScript**: Type definitions in `tsconfig.json`

## Compliance & Standards

### Code Standards

- Adherence to `./CLAUDE.md` guidelines
- TypeScript strict mode enabled
- ESLint configuration enforced
- Next.js 16 best practices
- shadcn/ui component patterns

### Documentation Standards

- Markdown format for all docs
- Component API documentation required
- Example usage in components
- Link to related files and references
- Version tracking and update history

## Communication & Reporting

### Status Updates

- Weekly progress summaries
- Phase completion reports
- Risk assessment updates
- Documentation changelog

### Documentation

- All docs in `/docs` directory
- Markdown format with clear headers
- Code examples included
- Links to related resources
- Last updated timestamp

## Approval & Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| Developer | (you) | 2025-12-07 | In Progress |
| Tech Lead | - | - | Pending |
| Product Owner | - | - | Pending |

## References

- **Main Architecture**: `/Users/lytran/Work/Learning/AReal/CLAUDE.md`
- **Code Standards**: `/Users/lytran/Work/Learning/AReal/docs/code-standards.md`
- **System Architecture**: `/Users/lytran/Work/Learning/AReal/docs/system-architecture.md`
- **Phase 01 Plan**: `/Users/lytran/Work/Learning/AReal/plans/251207-1414-tailwind-component-extraction/`
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
