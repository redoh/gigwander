import {
  pgTable, uuid, varchar, text, numeric, date, timestamp, jsonb, index,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { concerts } from "./concerts";

export const plans = pgTable(
  "plans",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    concertId: uuid("concert_id")
      .notNull()
      .references(() => concerts.id, { onDelete: "cascade" }),
    status: varchar("status", { length: 20 }).notNull().default("draft"),
    homeCity: varchar("home_city", { length: 255 }).notNull(),
    homeCountry: varchar("home_country", { length: 10 }),

    outboundTransport: jsonb("outbound_transport"),
    returnTransport: jsonb("return_transport"),
    accommodation: jsonb("accommodation"),

    ticketCost: numeric("ticket_cost", { precision: 10, scale: 2 }),
    transportCost: numeric("transport_cost", { precision: 10, scale: 2 }),
    accommodationCost: numeric("accommodation_cost", { precision: 10, scale: 2 }),
    estimatedFoodCost: numeric("estimated_food_cost", { precision: 10, scale: 2 }),
    totalCost: numeric("total_cost", { precision: 10, scale: 2 }),
    currency: varchar("currency", { length: 3 }).default("EUR"),

    aiExplanation: text("ai_explanation"),
    aiModel: varchar("ai_model", { length: 100 }),

    checkIn: date("check_in"),
    checkOut: date("check_out"),
    alternatives: jsonb("alternatives"),
    notes: text("notes"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index("idx_plans_user").on(table.userId),
    concertIdx: index("idx_plans_concert").on(table.concertId),
  })
);
