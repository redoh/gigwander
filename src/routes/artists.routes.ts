import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import * as artistService from "../services/artist.service";
import * as concertService from "../services/concert.service";

const artistRoutes = new Hono();

const listQuerySchema = z.object({
  q: z.string().optional(),
  genre: z.string().optional(),
});

// GET /api/v1/artists
artistRoutes.get("/", zValidator("query", listQuerySchema), async (c) => {
  const { q, genre } = c.req.valid("query");
  const artists = await artistService.listArtists(q, genre);
  return c.json({ success: true, data: artists });
});

// GET /api/v1/artists/:id
artistRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const artist = await artistService.getArtistById(id);
  if (!artist) {
    return c.json({ success: false, error: { code: "NOT_FOUND", message: "Artist not found" } }, 404);
  }

  const concerts = await concertService.getConcertsByArtist(id);
  return c.json({ success: true, data: { ...artist, concerts } });
});

export default artistRoutes;
