import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const decks = pgTable('decks', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // Clerk userId
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const cards = pgTable('cards', {
  id: serial('id').primaryKey(),
  deckId: integer('deck_id').notNull().references(() => decks.id, {onDelete: 'cascade'}),
  front: text('front').notNull(),
  back: text('back').notNull(),
  position: integer('position').notNull().default(0), // card order in deck
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const decksRelations = relations(decks, ({ many }) => ({
  cards: many(cards)
}));

export const cardsRelations = relations(cards, ({ one }) => ({
  deck: one(decks, { fields: [cards.deckId], references: [decks.id] })
}));
