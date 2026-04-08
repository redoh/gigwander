import { pgTable, uuid, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

export const artists = pgTable("artists", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  genres: text("genres").array().notNull(),
  imageUrl: text("image_url"),
  bio: text("bio"),
  popularity: integer("popularity").default(50),
  spotifyUrl: text("spotify_url"),
  instagramUrl: text("instagram_url"),
  websiteUrl: text("website_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
