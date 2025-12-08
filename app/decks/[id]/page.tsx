import { getDeck } from "@/app/actions/decks";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DeckActions } from "./deck-actions";
import { CardsList } from "./cards-list";

export default async function DeckPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deckId = parseInt(id, 10);

  if (isNaN(deckId)) {
    notFound();
  }

  let deck;
  try {
    deck = await getDeck(deckId);
  } catch (error) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/decks"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Decks
        </Link>
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{deck.name}</h1>
          {deck.description && (
            <p className="text-muted-foreground">{deck.description}</p>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
          </p>
        </div>
        <DeckActions deckId={deck.id} />
      </div>

      <CardsList deckId={deck.id} initialCards={deck.cards} />
    </div>
  );
}
