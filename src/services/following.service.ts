import { eq, and } from "drizzle-orm";
import { db } from "../db";
import { following, artists } from "../db/schema";

export async function followArtist(userId: string, artistId: string) {
  const [created] = await db
    .insert(following)
    .values({ userId, artistId })
    .onConflictDoNothing()
    .returning();

  if (created) return created;

  const [existing] = await db
    .select()
    .from(following)
    .where(and(eq(following.userId, userId), eq(following.artistId, artistId)));
  return existing;
}

export async function unfollowArtist(userId: string, artistId: string) {
  const [deleted] = await db
    .delete(following)
    .where(and(eq(following.userId, userId), eq(following.artistId, artistId)))
    .returning();
  return deleted ?? null;
}

export async function getFollowedArtists(userId: string) {
  return db
    .select({ artist: artists, followedAt: following.createdAt })
    .from(following)
    .innerJoin(artists, eq(following.artistId, artists.id))
    .where(eq(following.userId, userId));
}

export async function getFollowedArtistIds(userId: string): Promise<string[]> {
  const rows = await db
    .select({ artistId: following.artistId })
    .from(following)
    .where(eq(following.userId, userId));
  return rows.map((r) => r.artistId);
}

export async function isFollowing(userId: string, artistId: string): Promise<boolean> {
  const [row] = await db
    .select()
    .from(following)
    .where(and(eq(following.userId, userId), eq(following.artistId, artistId)));
  return !!row;
}
