import { Hono } from "hono";
import { auth } from "../auth";

const authRoutes = new Hono();

// Pass all auth requests to Better Auth handler
authRoutes.all("/*", (c) => auth.handler(c.req.raw));

export default authRoutes;
