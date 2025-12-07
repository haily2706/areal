# System Architecture Documentation

Last Updated: 2025-12-07 | Version: 1.0

## Architecture Overview

AReal is a modern full-stack Next.js application with a component-driven architecture. The system follows layered architecture principles with clear separation of concerns between presentation, business logic, and data access layers.

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser / Client                         │
├─────────────────────────────────────────────────────────────┤
│                  Next.js 16 App Router                      │
├────────────┬──────────────┬──────────────┬─────────────────┤
│   Pages    │  Components  │   Hooks      │   Utils         │
│ (SSR/CSR)  │ (Interactive)│ (State)      │ (Helpers)       │
├────────────┴──────────────┴──────────────┴─────────────────┤
│                                                             │
│  Server Actions (Authentication, DB Operations)            │
├─────────────────────────────────────────────────────────────┤
│                      Clerk Auth API                        │
├─────────────────────────────────────────────────────────────┤
│              Neon PostgreSQL (Phase 03+)                   │
└─────────────────────────────────────────────────────────────┘
```

## Layer Descriptions

### 1. Presentation Layer (Pages & Components)

**Location**: `app/` and `components/`

**Responsibility**: Render UI and handle user interactions

**Key Files**:
- `app/layout.tsx`: Root layout with ClerkProvider
- `app/page.tsx`: Homepage
- `app/tailwind-practice/page.tsx`: Educational content page
- `components/ui/`: Shared reusable components

**Technologies**:
- React 19 components
- Tailwind CSS styling
- shadcn/ui patterns
- Radix UI primitives

**Component Types**:

#### Server Components (Default)

```typescript
// app/page.tsx - Server component
export default function Page() {
  return <div>Server-rendered content</div>
}
```

**Benefits**:
- Direct database access
- Sensitive data handling
- Reduced JavaScript sent to client

#### Client Components

```typescript
"use client"
// Components with interactivity, hooks
import { useState } from "react"

export function InteractiveComponent() {
  const [state, setState] = useState("")
  return <div>{state}</div>
}
```

**Use Cases**:
- useState, useEffect, useContext
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, etc.)

### 2. Business Logic Layer (Server Actions & Utilities)

**Location**: `app/actions/` and `lib/`

**Responsibility**: Execute business logic, validate data, handle auth

**Server Actions Pattern**:

```typescript
// app/actions/user.ts
"use server"

import { auth } from "@clerk/nextjs/server"

export async function updateUserProfile(data: UserData) {
  const { userId } = await auth()

  // Step 1: Authenticate
  if (!userId) throw new Error("Unauthorized")

  // Step 2: Validate
  const validated = validateUserData(data)

  // Step 3: Execute
  const result = await db.users.update(userId, validated)

  // Step 4: Return
  return result
}
```

**Key Utilities** (`lib/utils.ts`):
- `cn()`: Class name composition helper
- Type definitions
- Constants and configurations

### 3. Data Access Layer (Database & ORM)

**Location**: `lib/db/` (Phase 03+)

**Status**: Not yet implemented

**Planned Structure**:

```typescript
// lib/db/schema.ts
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  clerkId: text("clerk_id").unique(),
  email: text("email").unique(),
  createdAt: timestamp("created_at").defaultNow()
})

// lib/db/client.ts
import { drizzle } from "drizzle-orm/neon-http"

export const db = drizzle(sql`${process.env.DATABASE_URL}`)

// Usage in Server Action
import { db } from "@/lib/db/client"
import { users } from "@/lib/db/schema"

export async function getUser(clerkId: string) {
  return await db.select().from(users).where(eq(users.clerkId, clerkId))
}
```

## Component Architecture

### Canonical Component Pattern

All UI components follow this established pattern:

```typescript
// imports
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// variants definition
const componentVariants = cva("base-styles", {
  variants: {
    variant: { default: "...", alternative: "..." },
    size: { default: "...", sm: "..." }
  },
  defaultVariants: { variant: "default", size: "default" }
})

// props interface
export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  asChild?: boolean
}

// component implementation
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

// exports
export { Component, componentVariants }
```

### Component Composition

**Via Props**:
```typescript
<SectionCard variant="practice" title="Exercise">
  {/* children */}
</SectionCard>
```

**Via asChild (Polymorphism)**:
```typescript
<SectionCard asChild>
  <article>Renders as article instead of default</article>
</SectionCard>
```

## Phase 01 Component Library

### SectionCard

**Pattern**: Container component
**Purpose**: Wrap educational content sections
**Location**: `app/tailwind-practice/components/section-card.tsx`

**Implementation Details**:
- Uses `<section>` by default (semantic HTML)
- Supports `asChild` for custom wrapper
- Optional `title` prop renders `<h3>`
- Supports 3 variants: default, practice, placeholder

**CSS Classes**:
```
Base: rounded-lg shadow border
Default: bg-card p-6 border-border
Practice: bg-card p-6 border-2 border-green-200
Placeholder: bg-card p-6 border-border
```

### CodeComparison

**Pattern**: Educational comparison widget
**Purpose**: Show traditional CSS vs Tailwind alternatives
**Location**: `app/tailwind-practice/components/code-comparison.tsx`

**Implementation Details**:
- Grid-based layout (2 columns desktop, 1 mobile)
- No asChild support (simpler variant pattern)
- Color-coded headers (red/green)
- Pre-styled code blocks

**CSS Classes**:
```
Grid: grid gap-4 grid-cols-1 md:grid-cols-2
Headers: font-medium (text-red-600 or text-green-600)
Code blocks: bg-muted p-3 rounded text-sm text-muted-foreground
```

### Callout

**Pattern**: Alert/notification component
**Purpose**: Display tips, info, and warnings
**Location**: `app/tailwind-practice/components/callout.tsx`

**Implementation Details**:
- Uses `<div>` by default
- Supports `asChild` for semantic elements
- Optional icon and title
- 3 variants with semantic colors

**CSS Classes**:
```
Base: p-4 rounded border-l-4
Tip: bg-accent/50 border-yellow-500
Info: bg-blue-50 dark:bg-blue-950/30 border-blue-500
Warning: bg-orange-50 dark:bg-orange-950/30 border-orange-500
```

## Data Flow

### Rendering Flow

```
1. User navigates to /tailwind-practice
   ↓
2. Next.js renders page (Server Component by default)
   ↓
3. Page imports client component or renders directly
   ↓
4. Components render using Tailwind + shadcn/ui patterns
   ↓
5. Browser receives hydrated HTML + minimal JavaScript
```

### Interactivity Flow

```
1. User clicks element (e.g., module selector)
   ↓
2. Client component event handler triggered
   ↓
3. State updated via useState/useContext
   ↓
4. React re-renders affected components
   ↓
5. Browser updates DOM efficiently
```

### Authentication Flow

```
1. User visits app
   ↓
2. ClerkProvider checks session
   ↓
3. If not signed in: Show <SignedOut /> content
   ↓
4. If signed in: Show <SignedIn /> content
   ↓
5. userId available in Server Actions via auth()
```

## Styling System

### Theme & Color System

**CSS Custom Properties** (defined in `app/globals.css`):

```css
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(0 0% 3.6%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(0 0% 3.6%);
  --border: hsl(0 0% 89.5%);
  --accent: hsl(0 0% 96.1%);
  --muted: hsl(0 0% 96.1%);
  --muted-foreground: hsl(0 0% 45.1%);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: hsl(0 0% 3.6%);
    --foreground: hsl(0 0% 98%);
    --card: hsl(0 0% 8.2%);
    --card-foreground: hsl(0 0% 98%);
    --border: hsl(0 0% 14.9%);
    --accent: hsl(0 0% 14.9%);
    --muted: hsl(0 0% 14.9%);
    --muted-foreground: hsl(0 0% 63.9%);
  }
}
```

**Tailwind Integration**:
```js
// tailwind.config.ts
theme: {
  colors: {
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    card: 'hsl(var(--card))',
    // ... more colors
  }
}
```

**Usage**:
```tsx
<div className="bg-background text-foreground">
  <div className="bg-card border border-border rounded-lg">
    Content
  </div>
</div>
```

### Responsive Design Strategy

**Mobile-First Approach**:
- Default styles for mobile (320px+)
- `sm:` for 640px+
- `md:` for 768px+
- `lg:` for 1024px+
- `xl:` for 1280px+

**Example**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 column mobile, 2 columns tablet, 3 columns desktop */}
</div>
```

### Dark Mode

**Implementation**:
- Uses `prefers-color-scheme: dark` media query
- CSS variables adjust automatically
- Tailwind `dark:` prefix for specific overrides
- No user toggle required (uses system preference)

**Example**:
```tsx
<div className="bg-white dark:bg-black text-black dark:text-white">
  Content
</div>
```

## Error Handling Strategy

### Client-Side Errors

```typescript
"use client"

export function Component() {
  const [error, setError] = useState<Error | null>(null)

  const handleClick = async () => {
    try {
      await riskyOperation()
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
    }
  }

  if (error) return <div className="text-destructive">{error.message}</div>

  return <button onClick={handleClick}>Action</button>
}
```

### Server-Side Errors

```typescript
"use server"

export async function serverAction(data: Data) {
  try {
    const validated = validateData(data)
    const result = await db.operation(validated)
    return { success: true, data: result }
  } catch (error) {
    console.error("Server action failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }
  }
}
```

## Security Architecture

### Authentication

**Clerk Integration**:
- Handles user signup/login
- Manages session tokens
- Provides userId in Server Actions

```typescript
import { auth } from "@clerk/nextjs/server"

export async function protectedAction() {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")
  // Proceed
}
```

### Authorization

**Pattern**:
- Server Actions check `userId`
- Validate user owns/can access resource
- Return 403 error if unauthorized

```typescript
export async function updateUserData(userId: string, data: Data) {
  const { userId: currentUserId } = await auth()

  // Verify ownership
  if (userId !== currentUserId) {
    throw new Error("Unauthorized")
  }

  // Proceed with update
}
```

### Data Protection

- No sensitive data in client components
- Database secrets in environment variables
- TypeScript prevents type misuse
- Input validation on server

## Performance Optimization

### Code Splitting

**Automatic via Next.js**:
- Page-specific components imported only when needed
- Route segments optimized independently

### Image Optimization

**Not yet implemented** (planned for Phase 03)

### Server-Side Caching

**Not yet implemented** (planned for Phase 03)

## Deployment Architecture

**Current**: Manual deployment (not yet configured)

**Planned**:
- Vercel platform (Next.js native)
- Environment variables via `.env.local`
- Database via Neon serverless
- Static site generation for content-heavy pages

## Monitoring & Logging

**Current**: Console logging only

**Planned**:
- Error tracking (Sentry or similar)
- Performance monitoring
- User analytics
- Database query logging

## Testing Architecture

**Current**: Manual testing only

**Planned** (Phase 04+):
- Unit tests (Vitest)
- Component tests (Testing Library)
- E2E tests (Playwright)
- Accessibility tests (axe-core)

## Dependencies & External Services

### NPM Dependencies

**Core**:
- `next@16`: Framework
- `react@19`: UI library
- `tailwindcss@4`: Styling

**UI Components**:
- `class-variance-authority`: Variant system
- `@radix-ui/react-slot`: Composition primitive
- `clsx`: Class merging utility

**Authentication**:
- `@clerk/nextjs`: Auth provider

**Database** (Phase 03+):
- `drizzle-orm`: ORM
- `@neondatabase/serverless`: Database client

### External APIs

- **Clerk API**: User authentication and session
- **Neon API**: PostgreSQL hosting (planned)

## Extension Points

### Adding New Components

1. Follow canonical pattern
2. Use CVA for variants
3. Support asChild where applicable
4. Export component + variants
5. Document in code-standards.md

### Adding New Pages

1. Create in `app/` with file-based routing
2. Use Server Components by default
3. Mark with `"use client"` only if needed
4. Import components from `@/components/ui/`

### Adding Server Actions

1. Create in `app/actions/<feature>.ts`
2. Mark with `"use server"` directive
3. Check auth with `auth()` from Clerk
4. Validate input
5. Return typed response

## References

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
- **Clerk**: https://clerk.com/docs
- **CVA**: https://cva.style
- **Radix UI**: https://radix-ui.com
