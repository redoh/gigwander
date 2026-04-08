import { eq, ilike, or, sql, and } from "drizzle-orm";
import { db } from "../db";
import { artists } from "../db/schema";

export async function listArtists(query?: string, genre?: string) {
  const conditions = [];
  if (query) {
    conditions.push(or(ilike(artists.name, `%${query}%`), ilike(artists.bio, `%${query}%`)));
  }
  if (genre) {
    conditions.push(sql`${artists.genres} @> ARRAY[${genre}]::text[]`);
  }
  if (conditions.length === 0) return db.select().from(artists);
  return db.select().from(artists).where(and(...conditions));
}

export async function getArtistById(id: string) {
  const [artist] = await db.select().from(artists).where(eq(artists.id, id));
  return artist ?? null;
}

export async function getArtistBySlug(slug: string) {
  const [artist] = await db.select().from(artists).where(eq(artists.slug, slug));
  return artist ?? null;
}
