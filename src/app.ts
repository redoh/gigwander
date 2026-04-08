import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/error-handler";
import apiRoutes from "./routes";

const app = new Hono();

// Middleware
app.use("*", cors());
app.use("*", logger);
app.onError(errorHandler);

// Health check
app.get("/", (c) =>
  c.json({
    name: "GigWander API",
    version: "1.0.0",
    description: "AI-driven concert trip planner",
    endpoints: "/api/v1",
  })
);

// API docs overview
app.get("/api/v1", (c) =>
  c.json({
    success: true,
    data: {
      auth: {
        "POST /api/v1/auth/sign-up/email": "Register",
        "POST /api/v1/auth/sign-in/email": "Login",
        "GET /api/v1/auth/get-session": "Current session",
      },
      artists: {
        "GET /api/v1/artists": "List/search artists (?q=&genre=)",
        "GET /api/v1/artists/:id": "Artist detail + concerts",
      },
      following: {
        "GET /api/v1/following": "List followed artists (auth)",
        "POST /api/v1/following/:artistId": "Follow (auth)",
        "DELETE /api/v1/following/:artistId": "Unfollow (auth)",
      },
      opportunities: {
        "GET /api/v1/opportunities": "All opportunities from followed artists (auth) (?sort=cheapest|nearest|best&currency=EUR)",
        "GET /api/v1/opportunities/artist/:artistId": "Opportunities for one artist (auth)",
      },
      plans: {
        "POST /api/v1/plans": "Create plan (auth) { concertId, homeCity? }",
        "GET /api/v1/plans": "List plans (auth)",
        "GET /api/v1/plans/:id": "Plan detail (auth)",
        "PATCH /api/v1/plans/:id": "Update plan (auth)",
        "DELETE /api/v1/plans/:id": "Delete plan (auth)",
      },
      budget: {
        "GET /api/v1/budget/convert": "Currency conversion (?amount=&from=&to=)",
      },
    },
  })
);

// Mount API
app.route("/api/v1", apiRoutes);

// 404
app.notFound((c) =>
  c.json({ success: false, error: { code: "NOT_FOUND", message: `${c.req.method} ${c.req.path} not found` } }, 404)
);

export default app;
