# AI Flashcard System MVP

## Overvie

Build a functional flashcard application with core features: deck management, manual card creation/editing, study sessions with SM-2 spaced repetition, and basic statistics dashboard.

## Tech Stack

- **Database**: Drizzle ORM + Neon (PostgreSQL)
- **Auth**: Clerk (already configured)
- **UI**: shadcn/ui + Tailwind (already configured)
- **SRS Algorithm**: SM-2 (SuperMemo 2)

## Database Schema

### Tables to create with Drizzle:

**decks**

- id (uuid, primary key)
- userId (string, from Clerk)
- name (string)
- description (text, nullable)
- color (string, default "#3b82f6")
- icon (string, nullable)
- createdAt (timestamp)
- updatedAt (timestamp)

**cards**

- id (uuid, primary key)
- deckId (uuid, foreign key to decks)
- front (text)
- back (text)
- createdAt (timestamp)
- updatedAt (timestamp)

**card_progress**

- id (uuid, primary key)
- userId (string, from Clerk)
- cardId (uuid, foreign key to cards)
- easeFactor (decimal, default 2.5)
- interval (integer, default 0) - days until next review
- repetitions (integer, default 0)
- lastReviewed (timestamp, nullable)
- nextReview (timestamp, nullable)
- totalReviews (integer, default 0)
- correctCount (integer, default 0)
- incorrectCount (integer, default 0)

**study_sessions**

- id (uuid, primary key)
- userId (string, from Clerk)
- deckId (uuid, foreign key to decks)
- startTime (timestamp)
- endTime (timestamp, nullable)
- cardsStudied (integer, default 0)
- correctAnswers (integer, default 0)

## Implementation Steps

### 1. Database Setup

- Install dependencies: `drizzle-orm`, `drizzle-kit`, `@neondatabase/serverless`
- Create `lib/db/schema.ts` with table definitions
- Create `lib/db/index.ts` for database connection
- Set up `drizzle.config.ts`
- Add Neon connection string to `.env.local`
- Run migrations to create tables

### 2. SM-2 Algorithm Implementation

Create `lib/srs/sm2.ts` with:

- `calculateNextReview(quality: 0-5, currentProgress)` - returns updated progress
- Quality ratings: 0-2 (Again), 3 (Hard), 4 (Good), 5 (Easy)
- Formula: 
  - EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  - If q < 3: repetitions = 0, interval = 1
  - If repetitions = 0: interval = 1
  - If repetitions = 1: interval = 6
  - Else: interval = previous interval * EF

### 3. Server Actions

Create `app/actions/` directory with:

**decks.ts**

- `createDeck(name, description, color, icon)`
- `updateDeck(id, data)`
- `deleteDeck(id)`
- `getUserDecks(userId)` - returns decks with card counts
- `getDeckById(id)` - includes cards

**cards.ts**

- `createCard(deckId, front, back)`
- `updateCard(id, front, back)`
- `deleteCard(id)`
- `getCardsByDeck(deckId)`

**study.ts**

- `getCardsForStudy(deckId, userId)` - returns cards due for review
- `submitCardReview(cardId, userId, quality)` - updates progress using SM-2
- `startStudySession(deckId, userId)`
- `endStudySession(sessionId, stats)`

**stats.ts**

- `getDashboardStats(userId)` - cards due today, total cards, streak
- `getDeckStats(deckId, userId)` - mastery %, cards by status

### 4. Page Structure

**app/(auth)/dashboard/page.tsx**

- Welcome message with user name
- Quick stats cards: Due Today, Total Cards, Study Streak
- List of decks with progress bars
- "New Deck" button
- "Study Now" CTA if cards are due

**app/(auth)/decks/page.tsx**

- Grid/list view of all decks
- Each deck shows: name, icon, color, card count, due count
- Actions: Edit, Delete, Study
- Create new deck dialog

**app/(auth)/decks/[id]/page.tsx**

- Deck details header (name, description, stats)
- List of all cards in deck
- Actions: Add Card, Edit Card, Delete Card, Start Studying
- Card preview on hover/click

**app/(auth)/study/[deckId]/page.tsx**

- Full-screen study interface
- Card display (front side initially)
- Flip button/click to reveal back
- Rating buttons: Again, Hard, Good, Easy
- Progress indicator: X/Y cards
- Exit button (saves session)

**app/(auth)/stats/page.tsx**

- Overall statistics
- Cards studied per day (simple list/table)
- Accuracy rate
- Time spent studying
- Breakdown by deck

### 5. UI Components

Create in `components/`:

**deck-card.tsx**

- Visual card component for deck display
- Shows name, icon, color, card count
- Click to view, hover actions

**flashcard.tsx**

- Animated flip card component
- Front/back display
- Flip animation on click

**study-controls.tsx**

- Rating buttons (Again, Hard, Good, Easy)
- Keyboard shortcuts (1-4)
- Progress bar

**deck-dialog.tsx**

- Form for creating/editing decks
- Name, description, color picker, icon selector

**card-dialog.tsx**

- Form for creating/editing cards
- Front/back text areas
- Preview mode

**stats-card.tsx**

- Reusable stat display component
- Icon, label, value, trend

### 6. Utilities

**lib/utils/date.ts**

- `isToday(date)`, `isTomorrow(date)`
- `formatRelativeDate(date)` - "in 2 days", "tomorrow"
- `calculateStreak(sessions)` - consecutive study days

**lib/utils/progress.ts**

- `calculateMastery(progress)` - % of cards mastered
- `getCardStatus(progress)` - "New", "Learning", "Review", "Mastered"

## Key Features

### Study Session Flow

1. User clicks "Study" on a deck
2. System fetches cards due for review (nextReview <= now)
3. Cards presented one at a time
4. User sees front, flips to see back
5. User rates difficulty (1-4)
6. SM-2 algorithm calculates next review date
7. Progress saved, next card shown
8. Session ends when all due cards reviewed

### SM-2 Implementation Details

- New cards: interval = 1 day
- If answered correctly once: interval = 6 days
- Each subsequent correct answer: interval *= easeFactor
- Incorrect answer: reset to interval = 1 day
- easeFactor adjusts based on difficulty rating

### Data Access Patterns

- Use Clerk's `auth()` to get userId in server actions
- All queries filtered by userId for security
- Use Drizzle's query builder for type-safe queries
- Implement proper error handling and validation

## File Structure

```
app/
├── (auth)/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── decks/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── study/
│   │   └── [deckId]/
│   │       └── page.tsx
│   └── stats/
│       └── page.tsx
├── actions/
│   ├── decks.ts
│   ├── cards.ts
│   ├── study.ts
│   └── stats.ts
components/
├── deck-card.tsx
├── flashcard.tsx
├── study-controls.tsx
├── deck-dialog.tsx
├── card-dialog.tsx
└── stats-card.tsx
lib/
├── db/
│   ├── schema.ts
│   └── index.ts
├── srs/
│   └── sm2.ts
└── utils/
    ├── date.ts
    └── progress.ts
```

## Environment Variables

```
DATABASE_URL=postgresql://...  # Neon connection string
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
```

## Testing the MVP

1. Create a deck
2. Add 5-10 cards manually
3. Start a study session
4. Rate cards with different difficulties
5. Check that nextReview dates are calculated correctly
6. Return next day, verify only due cards appear
7. Check dashboard stats update correctly

### To-dos

- [ ] Install Drizzle + Neon dependencies, create schema, configure connection, run migrations
- [ ] Create SM-2 algorithm implementation in lib/srs/sm2.ts
- [ ] Build server actions for decks, cards, study sessions, and stats
- [ ] Create deck listing, creation, editing, and deletion UI
- [ ] Create card creation, editing, deletion, and deck detail view
- [ ] Implement study session UI with flashcard component and rating controls
- [ ] Create dashboard with stats and quick actions
- [ ] Create statistics page with progress tracking
- [ ] Install Drizzle + Neon dependencies, create schema, configure connection, run migrations
- [ ] Create SM-2 algorithm implementation in lib/srs/sm2.ts
- [ ] Build server actions for decks, cards, study sessions, and stats
- [ ] Create deck listing, creation, editing, and deletion UI
- [ ] Create card creation, editing, deletion, and deck detail view
- [ ] Implement study session UI with flashcard component and rating controls
- [ ] Create dashboard with stats and quick actions
- [ ] Create statistics page with progress tracking