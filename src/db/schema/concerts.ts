import { pgTable, uuid, varchar, text, numeric, date, time, timestamp, index } from "drizzle-orm/pg-core";
import { artists } from "./artists";
import { venues } from "./venues";

export const concerts = pgTable(
  "concerts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    artistId: uuid("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" }),
    venueId: uuid("venue_id")
      .notNull()
      .references(() => venues.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    doorsOpen: time("doors_open"),
    showStart: time("show_start"),
    ticketPriceMin: numeric("ticket_price_min", { precision: 10, scale: 2 }),
    ticketPriceMax: numeric("ticket_price_max", { precision: 10, scale: 2 }),
    ticketCurrency: varchar("ticket_currency", { length: 3 }).default("EUR"),
    ticketUrl: text("ticket_url"),
    status: varchar("status", { length: 20 }).notNull().default("on_sale"),
    tourName: varchar("tour_name", { length: 255 }),
    supportingActs: text("supporting_acts").array(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    artistIdx: index("idx_concerts_artist").on(table.artistId),
    dateIdx: index("idx_concerts_date").on(table.date),
    statusIdx: index("idx_concerts_status").on(table.status),
  })
);
