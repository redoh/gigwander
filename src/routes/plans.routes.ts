import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { AuthEnv } from "../types/hono";
import { requireAuth } from "../auth/middleware";
import * as planService from "../services/plan.service";

const planRoutes = new Hono<AuthEnv>();

planRoutes.use("/*", requireAuth);

const createPlanSchema = z.object({
  concertId: z.string().uuid(),
  homeCity: z.string().optional(),
  homeCountry: z.string().optional(),
});

const updatePlanSchema = z.object({
  status: z.enum(["draft", "planned", "booked", "completed"]).optional(),
  notes: z.string().optional(),
});

// POST /api/v1/plans
planRoutes.post("/", zValidator("json", createPlanSchema), async (c) => {
  const user = c.get("user");
  const { concertId, homeCity, homeCountry } = c.req.valid("json");
  const city = homeCity || user.homeCity || "London";
  const country = homeCountry || user.homeCountry;

  const plan = await planService.createPlan(user.id, concertId, city, country ?? undefined);
  if (!plan) {
    return c.json({ success: false, error: { code: "NOT_FOUND", message: "Concert not found" } }, 404);
  }

  return c.json({ success: true, data: plan }, 201);
});

// GET /api/v1/plans
planRoutes.get("/", async (c) => {
  const user = c.get("user");
  const plans = await planService.getUserPlans(user.id);
  return c.json({ success: true, data: plans });
});

// GET /api/v1/plans/:id
planRoutes.get("/:id", async (c) => {
  const user = c.get("user");
  const plan = await planService.getPlanById(c.req.param("id"), user.id);
  if (!plan) {
    return c.json({ success: false, error: { code: "NOT_FOUND", message: "Plan not found" } }, 404);
  }
  return c.json({ success: true, data: plan });
});

// PATCH /api/v1/plans/:id
planRoutes.patch("/:id", zValidator("json", updatePlanSchema), async (c) => {
  const user = c.get("user");
  const updates = c.req.valid("json");
  const updated = await planService.updatePlan(c.req.param("id"), user.id, updates);
  if (!updated) {
    return c.json({ success: false, error: { code: "NOT_FOUND", message: "Plan not found" } }, 404);
  }
  return c.json({ success: true, data: updated });
});

// DELETE /api/v1/plans/:id
planRoutes.delete("/:id", async (c) => {
  const user = c.get("user");
  const deleted = await planService.deletePlan(c.req.param("id"), user.id);
  if (!deleted) {
    return c.json({ success: false, error: { code: "NOT_FOUND", message: "Plan not found" } }, 404);
  }
  return c.json({ success: true, data: { message: "Plan deleted" } });
});

export default planRoutes;
