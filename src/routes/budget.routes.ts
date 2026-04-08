import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { convertCurrency, formatPrice } from "../utils/currency";

const budgetRoutes = new Hono();

const convertSchema = z.object({
  amount: z.coerce.number().positive(),
  from: z.string().length(3),
  to: z.string().length(3),
});

// GET /api/v1/budget/convert
budgetRoutes.get("/convert", zValidator("query", convertSchema), (c) => {
  const { amount, from, to } = c.req.valid("query");
  const converted = convertCurrency(amount, from.toUpperCase(), to.toUpperCase());
  return c.json({
    success: true,
    data: {
      original: { amount, currency: from.toUpperCase(), formatted: formatPrice(amount, from.toUpperCase()) },
      converted: { amount: converted, currency: to.toUpperCase(), formatted: formatPrice(converted, to.toUpperCase()) },
    },
  });
});

export default budgetRoutes;
