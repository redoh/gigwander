import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { AuthEnv } from "../types/hono";
import { requireAuth } from "../auth/middleware";
import * as opportunityService from "../services/opportunity.service";

const opportunityRoutes = new Hono<AuthEnv>();

opportunityRoutes.use("/*", requireAuth);

const querySchema = z.object({
  sort: z.enum(["cheapest", "nearest", "best"]).default("best"),
  currency: z.string().default("EUR"),
  limit: z.coerce.number().min(1).max(50).default(20),
  homeCity: z.string().optional(),
});

// GET /api/v1/opportunities
opportunityRoutes.get("/", zValidator("query", querySchema), async (c) => {
  const user = c.get("user");
  const { sort, currency, limit, homeCity } = c.req.valid("query");
  const city = homeCity || user.homeCity || "London";

  const opportunities = await opportunityService.getOpportunitiesForUser(
    user.id, city, sort, currency, limit
  );

  return c.json({ success: true, data: opportunities });
});

// GET /api/v1/opportunities/artist/:artistId
opportunityRoutes.get("/artist/:artistId", zValidator("query", querySchema), async (c) => {
  const user = c.get("user");
  const artistId = c.req.param("artistId");
  const { sort, currency, limit, homeCity } = c.req.valid("query");
  const city = homeCity || user.homeCity || "London";

  const opportunities = await opportunityService.getOpportunitiesForArtist(
    artistId, city, sort, currency, limit
  );

  return c.json({ success: true, data: opportunities });
});

export default opportunityRoutes;
