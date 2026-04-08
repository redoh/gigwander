import { env } from "./env";
import app from "./app";

console.log(`
  ╔═══════════════════════════════════════╗
  ║       GigWander API v1.0.0            ║
  ║   AI-driven concert trip planner      ║
  ║                                       ║
  ║   http://localhost:${env.PORT}              ║
  ║   API: /api/v1                        ║
  ╚═══════════════════════════════════════╝
`);

export default {
  port: env.PORT,
  fetch: app.fetch,
};
