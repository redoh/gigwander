import { pgTable, uuid, timestamp, uniqueIndex, index } from "drizzle-orm/pg-core";
import { users } from "./users";
import { artists } from "./artists";

export const following = pgTable(
  "following",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    artistId: uuid("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueIdx: uniqueIndex("idx_following_unique").on(table.userId, table.artistId),
    userIdx: index("idx_following_user").on(table.userId),
  })
);
