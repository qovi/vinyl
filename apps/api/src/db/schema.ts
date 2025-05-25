import { sql } from 'drizzle-orm';
import * as p from 'drizzle-orm/pg-core';
import { pgTable as table } from 'drizzle-orm/pg-core';

const mediaConditions = p.pgEnum('mediaConditions', [
  'poor', 'fair', 'good', 'good plus', 'very good',
  'very good plus', 'near mint', 'mint'])();
  
const sleeveConditions = p.pgEnum('sleeveConditions', [
  'poor', 'fair', 'good', 'good plus', 'very good',
  'very good plus', 'near mint', 'mint', 'no cover',
  'generic'])();

export const products = table(
  'products',
  {
    id: p.serial('id').primaryKey(),
    barcode: p.text('barcode').notNull().unique(),
    price: p.doublePrecision('price').notNull(),
    conditionMedia: mediaConditions,
    conditionSleeve: sleeveConditions,
    title: p.text('title').notNull(),
    artist: p.text('artist').notNull(),
    releaseYear: p.text('releaseYear'),
    genre: p.text('genre'),
    coverUrl: p.text('cover_url').notNull(),
    category: p.text('category').notNull(),
    createdAt: p
      .timestamp('created_at', { withTimezone: true, mode: 'date' })
      .default(sql`now()`)
      .notNull(),
    updatedAt: p
      .timestamp('updated_at', { withTimezone: true, mode: 'date' })
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    artistIndex: p.index('artistIndex').on(t.artist),
    titleIndex: p.index('titleIndex').on(t.title),
  })
);
