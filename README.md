# Finance Dashboard API

Backend assessment project built with Fastify, TypeScript, Prisma, PostgreSQL, Zod, and JWT.

## Tech Stack

- Fastify (HTTP server)
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase-hosted or any Postgres)
- Zod (validation)
- @fastify/jwt (authentication)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` (or copy from `.env.example`) and set:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-at-least-32-chars"
PORT=3000
NODE_ENV="development"
```

3. Run migrations and seed:

```bash
npm run prisma:migrate
npm run prisma:seed
```

4. Start server:

```bash
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start API in watch mode
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled API
- `npm run prisma:migrate` - Run Prisma migration
- `npm run prisma:seed` - Seed sample data
- `npm run prisma:studio` - Open Prisma Studio
