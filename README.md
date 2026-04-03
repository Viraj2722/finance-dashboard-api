# Finance Data Processing and Access Control Backend

Assessment submission implementing a finance dashboard backend with clean architecture, role-based access control, validation, and analytics APIs.

## 1. Project Overview

This backend provides:

- User management with role and status controls
- Financial record CRUD with filters and soft delete
- Dashboard analytics endpoints (summary, category breakdown, trends, recent activity)
- JWT-based authentication and role-based authorization
- Zod validation and centralized error handling

## 2. Tech Stack

- Runtime: Node.js + TypeScript
- Framework: Fastify
- Database: PostgreSQL
- ORM: Prisma
- Validation: Zod
- Authentication: JWT via @fastify/jwt
- Password hashing: bcryptjs

## 3. Architecture and Code Organization

The code follows a layered structure:

- Route layer: endpoint definitions and middleware wiring
- Controller layer: request/response handling
- Service layer: business logic and data operations
- Data layer: Prisma client and schema

Main folders:

- [src/modules](src/modules) feature modules (auth, users, records, dashboard)
- [src/middleware](src/middleware) authentication and authorization guards
- [src/utils](src/utils) response and error utilities
- [src/config](src/config) environment and database config
- [prisma/schema.prisma](prisma/schema.prisma) database schema

## 4. Role Model and Access Control

Roles:

- VIEWER
- ANALYST
- ADMIN

Current access behavior:

- VIEWER: dashboard summary/recent and record read endpoints
- ANALYST: VIEWER capabilities plus category and trend analytics
- ADMIN: full access including user management and record mutations

Enforcement is done in middleware:

- [src/middleware/authenticate.ts](src/middleware/authenticate.ts)
- [src/middleware/authorize.ts](src/middleware/authorize.ts)

Additional rule:

- Inactive users cannot log in and cannot access protected APIs

Role matrix:

| Capability | VIEWER | ANALYST | ADMIN |
|---|---|---|---|
| View records | Yes | Yes | Yes |
| Create/update/delete records | No | No | Yes |
| View summary/recent | Yes | Yes | Yes |
| View category/trend insights | No | Yes | Yes |
| Manage users/roles/status | No | No | Yes |

## 5. API Surface

Auth endpoints:

- POST /api/auth/register
- POST /api/auth/login

Users endpoints (ADMIN):

- GET /api/users?page=1&limit=10
- GET /api/users/:id
- PATCH /api/users/:id/role
- PATCH /api/users/:id/status

Records endpoints:

- POST /api/records (ADMIN)
- GET /api/records
- GET /api/records/:id
- PATCH /api/records/:id (ADMIN)
- DELETE /api/records/:id (ADMIN, soft delete)

Dashboard endpoints:

- GET /api/dashboard/summary
- GET /api/dashboard/by-category
- GET /api/dashboard/trends?period=monthly
- GET /api/dashboard/recent

Health check:

- GET /health

## 6. Financial Record Logic

Record model includes:

- amount (Decimal 10,2)
- type (INCOME or EXPENSE)
- category
- date
- notes
- isDeleted for soft delete

Important behaviors:

- Amount is validated as positive and persisted as positive
- isDeleted records are excluded from list/analytics queries
- Filtering supports type/category/date range and pagination

## 7. Dashboard Aggregation Logic

- Summary endpoint uses Prisma aggregate for income/expense totals
- Category breakdown uses Prisma groupBy with type split
- Trends endpoint uses SQL date_trunc with 6-month window
- Recent endpoint returns latest 10 records

## 8. Validation and Error Handling

Validation:

- Zod schemas are module-scoped per feature
- Request body/query payloads are validated before service execution

Error handling:

- Centralized Fastify error handler in [src/app.ts](src/app.ts)
- Custom domain errors in [src/utils/errors.ts](src/utils/errors.ts)
- Consistent API envelope in [src/utils/response.ts](src/utils/response.ts)

HTTP status behavior:

- 200: successful read/update/delete operations
- 201: successful creation operations
- 401: unauthenticated or inactive user access
- 403: role does not have permission
- 404: requested resource not found
- 422: validation failure (Zod)
- 500: unexpected internal server error

Response shape:

```json
{
	"success": true,
	"message": "...",
	"data": {},
	"meta": {}
}
```

## 9. Data Persistence and Schema Design

Persistence:

- PostgreSQL via Prisma

Schema highlights:

- User and FinancialRecord with UUID primary keys
- Enum-based role, status, type, and category fields
- Foreign key: FinancialRecord.createdById -> User.id
- Indexed filter columns (type, category, date, createdById)

See [prisma/schema.prisma](prisma/schema.prisma).

## 10. Setup and Run

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Configure [ .env.example ] equivalent values in .env:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-at-least-32-chars"
NODE_ENV="development"
PORT=3000
```

4. Run migrations and seed:

```bash
npm run prisma:migrate
npm run prisma:seed
```

5. Start API:

```bash
npm run dev
```

## 11. Scripts

- npm run dev: run API in watch mode
- npm run build: compile TypeScript to dist
- npm start: run compiled output
- npm run prisma:migrate: run dev migration
- npm run prisma:seed: seed sample data
- npm run prisma:studio: open Prisma Studio

## 12. Seeded Test Users

The seed script creates:

- admin@example.com / admin123
- analyst@example.com / analyst123
- viewer@example.com / viewer123

## 13. Assumptions and Tradeoffs

- JWT authentication is stateless and role claims are checked against fresh DB user state in middleware.
- Viewer role is allowed read access to records in this implementation.
- No refresh-token flow is implemented to keep scope focused on assignment requirements.
- Automated tests are not included; manual validation and compile checks were used for this submission.
