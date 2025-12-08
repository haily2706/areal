"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteDeck } from "@/app/actions/decks";

export function DeckActions({ deckId }: { deckId: number }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this deck? All cards will be permanently deleted.")) {
      return;
    }

    setDeleting(true);
    try {
      await deleteDeck(deckId);
      router.push("/decks");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete deck");
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground h-9 px-3"
    >
      {deleting ? "Deleting..." : "Delete Deck"}
    </button>
  );
}
