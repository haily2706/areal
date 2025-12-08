"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDeck } from "@/app/actions/decks";
import Link from "next/link";

export default function NewDeckPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const deck = await createDeck({ name, description });
      router.push(`/decks/${deck.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create deck");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link
          href="/decks"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Decks
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Create New Deck</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive text-destructive rounded-md text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Deck Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={255}
            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="e.g., Spanish Vocabulary"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            placeholder="Add a description for this deck..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            {loading ? "Creating..." : "Create Deck"}
          </button>
          <Link
            href="/decks"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
