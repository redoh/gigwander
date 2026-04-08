import { pgTable, uuid, varchar, boolean, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  homeCity: varchar("home_city", { length: 255 }),
  homeCountry: varchar("home_country", { length: 10 }),
  currency: varchar("currency", { length: 3 }).default("EUR"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
