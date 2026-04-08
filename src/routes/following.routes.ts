import { Hono } from "hono";
import type { AuthEnv } from "../types/hono";
import { requireAuth } from "../auth/middleware";
import * as followingService from "../services/following.service";
import * as artistService from "../services/artist.service";

const followingRoutes = new Hono<AuthEnv>();

followingRoutes.use("/*", requireAuth);

// GET /api/v1/following
followingRoutes.get("/", async (c) => {
  const user = c.get("user");
  const followed = await followingService.getFollowedArtists(user.id);
  return c.json({ success: true, data: followed });
});

// POST /api/v1/following/:artistId
followingRoutes.post("/:artistId", async (c) => {
  const user = c.get("user");
  const artistId = c.req.param("artistId");

  const artist = await artistService.getArtistById(artistId);
  if (!artist) {
    return c.json({ success: false, error: { code: "NOT_FOUND", message: "Artist not found" } }, 404);
  }

  const result = await followingService.followArtist(user.id, artistId);
  return c.json({ success: true, data: result }, 201);
});

// DELETE /api/v1/following/:artistId
followingRoutes.delete("/:artistId", async (c) => {
  const user = c.get("user");
  const artistId = c.req.param("artistId");

  const deleted = await followingService.unfollowArtist(user.id, artistId);
  if (!deleted) {
    return c.json({ success: false, error: { code: "NOT_FOUND", message: "Not following this artist" } }, 404);
  }

  return c.json({ success: true, data: { message: "Unfollowed successfully" } });
});

export default followingRoutes;
