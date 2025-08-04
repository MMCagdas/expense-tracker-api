
# Expense Tracker API

This is a **backend-only Expense Tracker REST API** project built using:

- Fastify
- Prisma ORM + PostgreSQL
- JWT-based Authentication
- Zod for validation
- Modular Controller-Service Architecture

---

## About The Project

![Screenshot](public/screenshot.png)


This project is a backend REST API that allows users to register, login and manage their expenses securely. It uses JWT authentication to protect routes and Prisma ORM to interact with a PostgreSQL database.

CRUD operations for expenses include adding, updating, retrieving (with filtering by date ranges), and deleting expenses tied to the authenticated user.

Endpoints accept and return JSON data, and Zod schema validation is used to ensure input correctness.

---

## 🧱 Tech Stack

- **Runtime:** Node.js
- **Framework:** Fastify
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT
- **Validation:** Zod

---

## 🚀 Getting Started

1. Clone the repo:
```bash
git clone https://github.com/MMCagdas/expense-tracker-api.git
cd expense-tracker-api
```

2. (NO DOCKER) Install dependencies:
```bash
npm install fastify @fastify/cors @fastify/jwt @fastify/static @prisma/client bcrypt dotenv zod
npm install --save-dev prisma
```

3. Set environment variables in `.env` file:
```
PORT=3000
JWT_SECRET=your_secret_here
DATABASE_URL=postgresql://postgres:postgres@db:5432/expenses
```

4. (NO DOCKER) Setup database:
```bash
npx prisma migrate dev --name init
```

5. Run the docker:
```bash
docker-compose up --build
```

6. In another terminal:
```
docker exec -it expense-app npx prisma migrate dev --name init
```

7. 
```
http://localhost:3000
```

---

## 🔗 API Endpoints (Controller - Service)

### Authentication

- `POST /register` : Register new user
  - Body: `{ email: string, password: string }`

- `POST /login` : Login user and receive JWT token
  - Body: `{ email: string, password: string }`

### Expenses

- `GET /expenses` : Get all expenses for the authenticated user, optionally filter by query params:
  - Query params: `range` (e.g., past_week, last_month, last_3_months), `customStart` (ISO Date), `customEnd` (ISO Date)

- `POST /expenses` : Add new expense
  - Body: `{ amount: number, category: enum, date: ISO Date string, note?: string }`

- `PUT /expenses/:id` : Update expense by id
  - Params: `id` (expense id)
  - Body: `{ amount?: number, category?: enum, date?: ISO Date string, note?: string }`

- `DELETE /expenses/:id` : Delete expense by id
  - Params: `id` (expense id)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
