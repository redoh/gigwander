import { relations } from "drizzle-orm";
import { users } from "./schema/users";
import { sessions } from "./schema/sessions";
import { accounts } from "./schema/accounts";
import { artists } from "./schema/artists";
import { venues } from "./schema/venues";
import { concerts } from "./schema/concerts";
import { following } from "./schema/following";
import { plans } from "./schema/plans";

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  following: many(following),
  plans: many(plans),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const artistsRelations = relations(artists, ({ many }) => ({
  concerts: many(concerts),
  followers: many(following),
}));

export const venuesRelations = relations(venues, ({ many }) => ({
  concerts: many(concerts),
}));

export const concertsRelations = relations(concerts, ({ one, many }) => ({
  artist: one(artists, { fields: [concerts.artistId], references: [artists.id] }),
  venue: one(venues, { fields: [concerts.venueId], references: [venues.id] }),
  plans: many(plans),
}));

export const followingRelations = relations(following, ({ one }) => ({
  user: one(users, { fields: [following.userId], references: [users.id] }),
  artist: one(artists, { fields: [following.artistId], references: [artists.id] }),
}));

export const plansRelations = relations(plans, ({ one }) => ({
  user: one(users, { fields: [plans.userId], references: [users.id] }),
  concert: one(concerts, { fields: [plans.concertId], references: [concerts.id] }),
}));
