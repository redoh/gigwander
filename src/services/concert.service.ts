import { eq, gte, and, asc } from "drizzle-orm";
import { db } from "../db";
import { concerts, artists, venues } from "../db/schema";

export async function getConcertsByArtist(artistId: string) {
  return db
    .select({
      concert: concerts,
      venue: venues,
    })
    .from(concerts)
    .innerJoin(venues, eq(concerts.venueId, venues.id))
    .where(eq(concerts.artistId, artistId))
    .orderBy(asc(concerts.date));
}

export async function getUpcomingConcertsByArtist(artistId: string) {
  const today = new Date().toISOString().split("T")[0];
  return db
    .select({
      concert: concerts,
      venue: venues,
    })
    .from(concerts)
    .innerJoin(venues, eq(concerts.venueId, venues.id))
    .where(and(eq(concerts.artistId, artistId), gte(concerts.date, today)))
    .orderBy(asc(concerts.date));
}

export async function getConcertById(concertId: string) {
  const [result] = await db
    .select({
      concert: concerts,
      artist: artists,
      venue: venues,
    })
    .from(concerts)
    .innerJoin(artists, eq(concerts.artistId, artists.id))
    .innerJoin(venues, eq(concerts.venueId, venues.id))
    .where(eq(concerts.id, concertId));
  return result ?? null;
}

export async function getUpcomingConcertsForArtists(artistIds: string[]) {
  if (artistIds.length === 0) return [];
  const today = new Date().toISOString().split("T")[0];
  return db
    .select({
      concert: concerts,
      artist: artists,
      venue: venues,
    })
    .from(concerts)
    .innerJoin(artists, eq(concerts.artistId, artists.id))
    .innerJoin(venues, eq(concerts.venueId, venues.id))
    .where(
      and(
        sql`${concerts.artistId} = ANY(${artistIds}::uuid[])`,
        gte(concerts.date, today)
      )
    )
    .orderBy(asc(concerts.date));
}

// Need to import sql for the array query
import { sql } from "drizzle-orm";
