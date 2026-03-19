# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Project: Angry Birds-Style Game ("Angry Flock")

A fully functional Angry Birds-style physics game built with:
- **Phaser.js** — game engine with Matter.js physics
- **React + Vite** — UI shell, menus, and screens
- **Framer Motion** — UI animations
- **Canvas Confetti** — level completion effects
- **Web Audio API** — procedural sound effects and background music

### Game Features
- Physics-based slingshot mechanics
- Multiple bird types: Red, Chuck (speed boost), Bomb (explodes)
- Destructible structures: wood, stone, ice blocks
- Pig enemies with damage/death
- 20 levels with progressive difficulty (expandable to 500)
- 1-3 star scoring per level
- Pause, restart, level select screens
- Sound effects and background music (procedural, no audio files needed)
- Progress saved to PostgreSQL via REST API

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── angry-birds-game/   # React + Phaser game
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Database Schema

- `level_progress` — per-level stars, best score, attempts, completion status
- `high_scores` — player name, level, score, stars, timestamp

## API Endpoints

- `GET /api/healthz` — health check
- `GET /api/progress` — all level progress
- `POST /api/progress` — save level progress `{levelId, stars, score}`
- `GET /api/progress/:levelId` — specific level progress
- `GET /api/scores` — top 50 high scores
- `POST /api/scores` — submit score `{playerName, levelId, score, stars}`
- `GET /api/stats` — overall game statistics

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`.

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — only `.d.ts` files emitted during typecheck

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build`
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly`

## Dev Commands

- `pnpm --filter @workspace/angry-birds-game run dev` — game frontend
- `pnpm --filter @workspace/api-server run dev` — API server
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push schema to database
