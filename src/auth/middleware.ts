import { createMiddleware } from "hono/factory";
import { auth } from ".";

type AuthEnv = {
  Variables: {
    user: { id: string; email: string; name: string | null; homeCity: string | null; homeCountry: string | null; currency: string | null };
    session: { id: string };
  };
};

export const requireAuth = createMiddleware<AuthEnv>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      401
    );
  }

  c.set("user", session.user as any);
  c.set("session", session.session as any);
  await next();
});
