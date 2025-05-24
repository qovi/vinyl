import { sql } from 'drizzle-orm';
import * as p from 'drizzle-orm/pg-core';
import { pgTable as table } from 'drizzle-orm/pg-core';

export const products = table(
  'products', {
    //@ts-ignore
    id: p.integer().primaryKey().generatedAlwaysAsIdentity(),
    barcode: p.text('price').notNull().unique(),
    price: p.doublePrecision('price').notNull(),
    conditionMedia: p.pgEnum("mediaConditions", ["poor", "fair", "good", "good plus", "very good", "very good plus", "near mint", "mint"]),
    conditionSleeve: p.pgEnum("sleeveConditions", ["poor", "fair", "good", "good plus", "very good", "very good plus", "near mint", "mint", "no cover", "generic"]),
    title: p.text("title").notNull(),
    artist: p.text("artist").notNull(),
    releaseYear: p.text("releaseYear"),
    genre: p.text("genre"),
    coverUrl: p.text("cover_url").notNull(),
    category: p.text("category").notNull(),
    createdAt: p.timestamp("created_at", { withTimezone: true, mode: "date" })
      .default(sql`now()`)
      .notNull(),
    updatedAt: p.timestamp("updated_at", { withTimezone: true, mode: "date" }).$onUpdate(
      () => new Date()
    ),
  },
  (t) => ({
    artistIndex: p.index("artistIndex").on(t.artist),
    titleIndex: p.index("titleIndex").on(t.title)
  })
);