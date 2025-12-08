"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCard, deleteCard } from "@/app/actions/cards";

type Card = {
  id: number;
  front: string;
  back: string;
  position: number;
  createdAt: Date;
};

export function CardsList({
  deckId,
  initialCards,
}: {
  deckId: number;
  initialCards: Card[];
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createCard({ deckId, front, back });
      setFront("");
      setBack("");
      setShowForm(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create card");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cardId: number) => {
    if (!confirm("Are you sure you want to delete this card?")) {
      return;
    }

    try {
      await deleteCard(cardId);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete card");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Cards</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
          >
            Add Card
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-card">
          <h3 className="font-semibold mb-4">New Card</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="front" className="block text-sm font-medium mb-2">
                Front *
              </label>
              <textarea
                id="front"
                value={front}
                onChange={(e) => setFront(e.target.value)}
                required
                rows={2}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Question or prompt..."
              />
            </div>

            <div>
              <label htmlFor="back" className="block text-sm font-medium mb-2">
                Back *
              </label>
              <textarea
                id="back"
                value={back}
                onChange={(e) => setBack(e.target.value)}
                required
                rows={2}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Answer or response..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || !front.trim() || !back.trim()}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
              >
                {loading ? "Adding..." : "Add Card"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFront("");
                  setBack("");
                  setError(null);
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {initialCards.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground mb-4">No cards in this deck yet</p>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4"
            >
              Add your first card
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {initialCards.map((card) => (
            <div
              key={card.id}
              className="p-4 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">FRONT</p>
                  <p className="whitespace-pre-wrap">{card.front}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">BACK</p>
                  <p className="whitespace-pre-wrap">{card.back}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleDelete(card.id)}
                  className="text-sm text-destructive hover:text-destructive/80"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
