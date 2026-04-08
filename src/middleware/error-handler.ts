import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export function errorHandler(err: Error, c: Context) {
  console.error(`[ERROR] ${err.message}`);

  if (err instanceof HTTPException) {
    return c.json(
      { success: false, error: { code: "HTTP_ERROR", message: err.message } },
      err.status
    );
  }

  return c.json(
    {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message:
          process.env.NODE_ENV === "production" ? "An unexpected error occurred" : err.message,
      },
    },
    500
  );
}
