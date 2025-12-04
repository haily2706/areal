# Copilot Instructions — AReal

Short, actionable guidance for AI coding agents working on AReal.

1) Big picture
- Next.js 16 app using the app/ router and React 19. UI uses `shadcn/ui` components + Tailwind CSS.
- Authentication: Clerk (`@clerk/nextjs`) — global provider is configured in `app/layout.tsx`.
- Data layer planned with Drizzle ORM + Neon (Postgres). Server-side logic should live in `app/actions/`.

2) Primary conventions and patterns
- TypeScript strict mode is expected. Avoid `any` unless unavoidable.
- UI components: Put shadcn-based components in `components/ui/` and import via `@/components/ui/...`.
- Styling: Tailwind classes only. Use the `cn()` helper in `lib/utils.ts` to merge classes safely.
- Component pattern: use `class-variance-authority` for variants and Radix `Slot` for `asChild` (see `components/ui/button.tsx`).

3) Server actions & auth
- Use Server Actions (`app/actions/`) for operations that require server auth or DB access.
- Always call `auth()` from `@clerk/nextjs/server` and validate `userId` before performing user-scoped changes.
  Example pattern to follow (place in `app/actions/decks.ts`):

```ts
"use server";
import { auth } from "@clerk/nextjs/server";
export async function createDeck(input: { name: string }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  // create deck assigned to userId
}
```

4) Files and locations to inspect for context
- `AGENTS.md` — canonical project conventions and architecture (read first).
- `CLAUDE.md` — planning-first workflow (plans live in `plans/`).
- `app/layout.tsx` — global layout + Clerk provider and theme hooks.
- `components/ui/button.tsx` — canonical component structure (cva + cn + Slot).
- `lib/utils.ts` — helper utilities used across components.
- `tailwind.config.ts` — content globs; add paths here if you create new directories with JSX/TSX.

5) Workflow rules (non-optional)
- Plan-first: create a plan in `plans/<feature>.plan.md` and get it approved before implementation (see `CLAUDE.md` for plan template).
- After implementing, run `npm run lint` and `npm run build` to surface TypeScript or lint errors.
- Add new UI components into `components/ui/` using shadcn patterns — prefer composition over custom primitives.

6) Useful commands
- Dev server: `npm run dev` (Next dev on localhost)
- Lint: `npm run lint`
- Build/type-check: `npm run build` (Next performs type checking during build)

7) Project-specific gotchas
- There are no test scripts defined; do not assume an existing test harness.
- Imports use the `@/` path alias — preserve this when moving files.
- Tailwind is v4; use `tailwind-merge` patterns when dynamically composing classes (see `lib/utils.ts`).

8) When editing or adding files
- Keep changes minimal and focused to match existing patterns (e.g., follow `button.tsx` structure for new UI components).
- When adding Server Actions, include `
 - When adding Server Actions, include `"use server"` at the top, call `auth()` from `@clerk/nextjs/server`, and validate `userId` before accessing user-scoped resources.

9) PR / commit guidance
- Create feature branches off `main` and keep commits small and focused.
- Run `npm run lint` and `npm run build` locally before opening a PR. Mention any manual verification steps in the PR description.

10) If something's missing
- If you need more context, open `AGENTS.md` and `CLAUDE.md` (both in repo root) — they contain the planning workflow and conventions.
- Ask the repo owner for database connection details before adding migrations (Drizzle + Neon planned but not yet wired).

Feedback
- If any section is unclear or you want additional examples (server action templates, sample plan template, or more component examples), say which section to expand and I'll update this file.