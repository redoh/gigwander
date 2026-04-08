import { Hono } from "hono";
import authRoutes from "./auth.routes";
import artistRoutes from "./artists.routes";
import followingRoutes from "./following.routes";
import opportunityRoutes from "./opportunities.routes";
import planRoutes from "./plans.routes";
import budgetRoutes from "./budget.routes";

const api = new Hono();

api.route("/auth", authRoutes);
api.route("/artists", artistRoutes);
api.route("/following", followingRoutes);
api.route("/opportunities", opportunityRoutes);
api.route("/plans", planRoutes);
api.route("/budget", budgetRoutes);

export default api;
