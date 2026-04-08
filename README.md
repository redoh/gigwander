# GigWander

AI-driven concert trip planner API. Follow your favorite artists, discover upcoming concerts, and get complete trip plans with transport, accommodation, and budget estimates.

## Tech Stack

- **Runtime:** Bun
- **Framework:** Hono
- **Database:** PostgreSQL + Drizzle ORM
- **Auth:** Better Auth (email/password, Google, Spotify OAuth)
- **AI:** OpenAI (with mock provider fallback)
- **Validation:** Zod
- **Linting:** Biome

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) >= 1.0
- PostgreSQL (or Docker)

### Setup

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env

# Start PostgreSQL with Docker
docker compose up -d

# Push schema to database
bun run db:push

# Seed sample data
bun run db:seed

# Start dev server
bun run dev
```

The API will be available at `http://localhost:3000`.

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/sign-up/email` | Register |
| POST | `/api/v1/auth/sign-in/email` | Login |
| GET | `/api/v1/auth/get-session` | Current session |

### Artists
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/artists` | List/search artists (`?q=&genre=`) |
| GET | `/api/v1/artists/:id` | Artist detail + concerts |

### Following
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/following` | List followed artists |
| POST | `/api/v1/following/:artistId` | Follow artist |
| DELETE | `/api/v1/following/:artistId` | Unfollow artist |

### Opportunities
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/opportunities` | All opportunities from followed artists (`?sort=cheapest\|nearest\|best&currency=EUR`) |
| GET | `/api/v1/opportunities/artist/:artistId` | Opportunities for a specific artist |

### Plans
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/plans` | Create trip plan (`{ concertId, homeCity? }`) |
| GET | `/api/v1/plans` | List plans |
| GET | `/api/v1/plans/:id` | Plan detail |
| PATCH | `/api/v1/plans/:id` | Update plan |
| DELETE | `/api/v1/plans/:id` | Delete plan |

### Budget
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/budget/convert` | Currency conversion (`?amount=&from=&to=`) |

## Scripts

```bash
bun run dev          # Start dev server with hot reload
bun run start        # Start production server
bun run db:generate  # Generate Drizzle migrations
bun run db:migrate   # Run migrations
bun run db:push      # Push schema to DB
bun run db:seed      # Seed sample data
bun run db:studio    # Open Drizzle Studio
bun run check        # Lint with Biome
bun run format       # Format with Biome
bun run test         # Run tests
bun run typecheck    # TypeScript type check
```

## Environment Variables

See [`.env.example`](.env.example) for all available configuration options. OpenAI and OAuth keys are optional — the app falls back to mock providers when they're not set.

## Docker

```bash
docker compose up -d  # PostgreSQL only
```

To run the full app in Docker:

```bash
docker build -t gigwander .
docker run -p 3000:3000 --env-file .env gigwander
```
