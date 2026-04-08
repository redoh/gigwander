import type { Hono } from "hono";

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  homeCity: string | null;
  homeCountry: string | null;
  currency: string | null;
};

export type AuthVariables = {
  user: AuthUser;
  session: { id: string };
};

export type AuthEnv = { Variables: AuthVariables };
