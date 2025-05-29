import { sql } from 'drizzle-orm';
import * as p from 'drizzle-orm/pg-core';
import { pgTable as table } from 'drizzle-orm/pg-core';

export const mediaConditionsEnum = p.pgEnum('mediaConditions', [
  'poor', 'fair', 'good', 'good plus', 'very good',
  'very good plus', 'near mint', 'mint']);
  
export const sleeveConditionsEnum = p.pgEnum('sleeveConditions', [
  'poor', 'fair', 'good', 'good plus', 'very good',
  'very good plus', 'near mint', 'mint', 'no cover',
  'generic']);

export const userRolesEnum = p.pgEnum('userRoles', ['guest', 'user', 'admin']);

export const categoriesEnum = p.pgEnum('categories', [
  'lp vinyl', '12" maxi', '7" single', 'cd album', 'cd single'
]);

export const users = table(
  'users',
  {
    id: p.serial('id').primaryKey(),
    email: p.text('email').notNull().unique(),
    username: p.text('username').notNull().unique(),
    password: p.text('password').notNull(),
    role: userRolesEnum('role').default('guest').notNull(),
    firstName: p.text('first_name'),
    lastName: p.text('last_name'),
    isActive: p.boolean('is_active').default(true).notNull(),
    createdAt: p
      .timestamp('created_at', { withTimezone: true, mode: 'date' })
      .default(sql`now()`)
      .notNull(),
    updatedAt: p
      .timestamp('updated_at', { withTimezone: true, mode: 'date' })
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => ({
    emailIndex: p.index('emailIndex').on(t.email),
    usernameIndex: p.index('usernameIndex').on(t.username),
  })
);

export const products = table(
  'products',
  {
    id: p.serial('id').primaryKey(),
    price: p.doublePrecision('price').notNull(),
    conditionMedia: mediaConditionsEnum('conditionMedia').notNull(),
    conditionSleeve: sleeveConditionsEnum('conditionSleeve').notNull(),
    title: p.text('title').notNull(),
    artist: p.text('artist').notNull(),
    releaseYear: p.integer('release_year').notNull(),
    genre: p.text('genre').notNull(),
    coverUrl: p.text('cover_url').notNull(),
    category: categoriesEnum('category').notNull(),
    createdAt: p
      .timestamp('created_at', { withTimezone: true, mode: 'date' })
      .default(sql`now()`)
      .notNull(),
    updatedAt: p
      .timestamp('updated_at', { withTimezone: true, mode: 'date' })
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => ({
    artistIndex: p.index('artistIndex').on(t.artist),
    titleIndex: p.index('titleIndex').on(t.title),
  })
);

export const sessions = table(
  'sessions',
  {
    id: p.serial('id').primaryKey(),
    userId: p.integer('user_id').references(() => users.id).notNull(),
    token: p.text('token').notNull().unique(),
    expiresAt: p.timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
    createdAt: p
      .timestamp('created_at', { withTimezone: true, mode: 'date' })
      .default(sql`now()`)
      .notNull(),
  }
);