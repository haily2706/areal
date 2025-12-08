"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { decks } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createDeck(input: { name: string; description?: string }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Validate input
  if (!input.name || input.name.trim().length === 0) {
    throw new Error("Deck name is required");
  }
  if (input.name.length > 255) {
    throw new Error("Deck name must be less than 255 characters");
  }

  const [deck] = await db.insert(decks).values({
    userId,
    name: input.name.trim(),
    description: input.description?.trim()
  }).returning();

  revalidatePath("/decks");
  return deck;
}

export async function getUserDecks() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return db.query.decks.findMany({
    where: eq(decks.userId, userId),
    with: { cards: true }, // include related cards
    orderBy: desc(decks.updatedAt)
  });
}

export async function getDeck(deckId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const deck = await db.query.decks.findFirst({
    where: eq(decks.id, deckId),
    with: { cards: true }
  });

  if (!deck) throw new Error("Deck not found");
  if (deck.userId !== userId) throw new Error("Unauthorized");

  return deck;
}

export async function updateDeck(deckId: number, input: { name?: string; description?: string }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Verify ownership
  const deck = await db.query.decks.findFirst({
    where: eq(decks.id, deckId)
  });
  if (!deck) throw new Error("Deck not found");
  if (deck.userId !== userId) throw new Error("Unauthorized");

  // Validate input
  if (input.name !== undefined) {
    if (!input.name || input.name.trim().length === 0) {
      throw new Error("Deck name cannot be empty");
    }
    if (input.name.length > 255) {
      throw new Error("Deck name must be less than 255 characters");
    }
  }

  const [updatedDeck] = await db.update(decks)
    .set({
      ...(input.name !== undefined && { name: input.name.trim() }),
      ...(input.description !== undefined && { description: input.description?.trim() }),
      updatedAt: new Date()
    })
    .where(eq(decks.id, deckId))
    .returning();

  revalidatePath("/decks");
  revalidatePath(`/decks/${deckId}`);
  return updatedDeck;
}

export async function deleteDeck(deckId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Verify ownership
  const deck = await db.query.decks.findFirst({
    where: eq(decks.id, deckId)
  });
  if (!deck) throw new Error("Deck not found");
  if (deck.userId !== userId) throw new Error("Unauthorized");

  await db.delete(decks).where(eq(decks.id, deckId));

  revalidatePath("/decks");
  return { success: true };
}
