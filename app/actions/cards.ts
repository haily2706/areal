"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { cards, decks } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createCard(input: {
  deckId: number;
  front: string;
  back: string;
  position?: number;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Verify deck ownership
  const deck = await db.query.decks.findFirst({
    where: and(eq(decks.id, input.deckId), eq(decks.userId, userId))
  });
  if (!deck) throw new Error("Deck not found or unauthorized");

  // Validate input
  if (!input.front || input.front.trim().length === 0) {
    throw new Error("Card front is required");
  }
  if (!input.back || input.back.trim().length === 0) {
    throw new Error("Card back is required");
  }

  // Get next position if not provided
  let position = input.position ?? 0;
  if (position === 0) {
    const existingCards = await db.query.cards.findMany({
      where: eq(cards.deckId, input.deckId),
      orderBy: desc(cards.position)
    });
    position = existingCards.length > 0 ? existingCards[0].position + 1 : 0;
  }

  const [card] = await db.insert(cards).values({
    deckId: input.deckId,
    front: input.front.trim(),
    back: input.back.trim(),
    position
  }).returning();

  // Update deck's updatedAt
  await db.update(decks)
    .set({ updatedAt: new Date() })
    .where(eq(decks.id, input.deckId));

  revalidatePath("/decks");
  revalidatePath(`/decks/${input.deckId}`);
  return card;
}

export async function getCard(cardId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const card = await db.query.cards.findFirst({
    where: eq(cards.id, cardId),
    with: { deck: true }
  });

  if (!card) throw new Error("Card not found");
  if (card.deck.userId !== userId) throw new Error("Unauthorized");

  return card;
}

export async function updateCard(cardId: number, input: {
  front?: string;
  back?: string;
  position?: number;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Verify ownership through deck
  const card = await db.query.cards.findFirst({
    where: eq(cards.id, cardId),
    with: { deck: true }
  });
  if (!card) throw new Error("Card not found");
  if (card.deck.userId !== userId) throw new Error("Unauthorized");

  // Validate input
  if (input.front !== undefined && (!input.front || input.front.trim().length === 0)) {
    throw new Error("Card front cannot be empty");
  }
  if (input.back !== undefined && (!input.back || input.back.trim().length === 0)) {
    throw new Error("Card back cannot be empty");
  }

  const [updatedCard] = await db.update(cards)
    .set({
      ...(input.front !== undefined && { front: input.front.trim() }),
      ...(input.back !== undefined && { back: input.back.trim() }),
      ...(input.position !== undefined && { position: input.position })
    })
    .where(eq(cards.id, cardId))
    .returning();

  // Update deck's updatedAt
  await db.update(decks)
    .set({ updatedAt: new Date() })
    .where(eq(decks.id, card.deckId));

  revalidatePath("/decks");
  revalidatePath(`/decks/${card.deckId}`);
  return updatedCard;
}

export async function deleteCard(cardId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Verify ownership through deck
  const card = await db.query.cards.findFirst({
    where: eq(cards.id, cardId),
    with: { deck: true }
  });
  if (!card) throw new Error("Card not found");
  if (card.deck.userId !== userId) throw new Error("Unauthorized");

  await db.delete(cards).where(eq(cards.id, cardId));

  // Update deck's updatedAt
  await db.update(decks)
    .set({ updatedAt: new Date() })
    .where(eq(decks.id, card.deckId));

  revalidatePath("/decks");
  revalidatePath(`/decks/${card.deckId}`);
  return { success: true };
}

export async function getDeckCards(deckId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Verify deck ownership
  const deck = await db.query.decks.findFirst({
    where: and(eq(decks.id, deckId), eq(decks.userId, userId))
  });
  if (!deck) throw new Error("Deck not found or unauthorized");

  return db.query.cards.findMany({
    where: eq(cards.deckId, deckId),
    orderBy: (cards, { asc }) => [asc(cards.position)]
  });
}
