import { getUserDecks } from "@/app/actions/decks";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default async function DecksPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SignedOut>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">My Decks</h1>
          <p className="text-muted-foreground mb-6">
            Please sign in to manage your flashcard decks
          </p>
        </div>
      </SignedOut>

      <SignedIn>
        <DecksList />
      </SignedIn>
    </div>
  );
}

async function DecksList() {
  const decks = await getUserDecks();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Decks</h1>
        <Link
          href="/decks/new"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Create Deck
        </Link>
      </div>

      {decks.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground mb-4">You don't have any decks yet</p>
          <Link
            href="/decks/new"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Create your first deck
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {decks.map((deck) => (
            <Link
              key={deck.id}
              href={`/decks/${deck.id}`}
              className="block p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{deck.name}</h2>
                <span className="text-sm text-muted-foreground">
                  {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
                </span>
              </div>
              {deck.description && (
                <p className="text-muted-foreground text-sm">{deck.description}</p>
              )}
              <p className="text-xs text-muted-foreground mt-4">
                Updated {new Date(deck.updatedAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
