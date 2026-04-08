import { eq, ilike, or, sql } from "drizzle-orm";
import { db } from "../db";
import { artists } from "../db/schema";

export async function listArtists(query?: string, genre?: string) {
  if (query) {
    return db
      .select()
      .from(artists)
      .where(or(ilike(artists.name, `%${query}%`), ilike(artists.bio, `%${query}%`)));
  }
  if (genre) {
    return db
      .select()
      .from(artists)
      .where(sql`${artists.genres} @> ARRAY[${genre}]::text[]`);
  }
  return db.select().from(artists);
}

export async function getArtistById(id: string) {
  const [artist] = await db.select().from(artists).where(eq(artists.id, id));
  return artist ?? null;
}

export async function getArtistBySlug(slug: string) {
  const [artist] = await db.select().from(artists).where(eq(artists.slug, slug));
  return artist ?? null;
}
