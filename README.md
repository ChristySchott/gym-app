# 🏋️ Gym Check-In App

A RESTful API for managing gym check-ins built with **Node.js**, **Fastify**, **TypeScript**, **Prisma ORM**, and **Docker**. This project applies SOLID principles and design patterns, demonstrating secure JWT-based authentication with refresh tokens, role-based access control (RBAC), schema validation with Zod, and robust testing strategies.

## 🚀 Functional Requirements (RFs)

- ✅ **User Registration** — Allow new users to register with unique email addresses.  
- ✅ **Authentication** — Enable registered users to log in and receive JWTs.  
- ✅ **User Profile** — Retrieve profile details of the authenticated user.  
- ✅ **Check-In Count** — Fetch the total number of check-ins performed by the user.  
- ✅ **Check-In History** — Provide a paginated history (20 items per page) of user check-ins.  
- ✅ **Search Gyms by Proximity** — Find gyms within a 10 km radius of the user’s location.  
- ✅ **Search Gyms by Name** — Look up gyms by name.  
- ✅ **Perform Check-In** — Allow users to check in to a gym when within 100 m.  
- ✅ **Validate Check-In** — Enable administrators to validate user check-ins within 20 minutes of creation.  
- ✅ **Gym Registration** — Permit administrators to register new gyms.

## 🔒 Business Rules (RNs)

- Users **cannot register** with an email that is already in use.  
- Users **cannot perform more than one** check-in per day.  
- Check-ins are only allowed if the user is within **100 m** of the gym.  
- Check-ins can only be **validated** by users with the **admin** role and within **20 minutes** of creation.  
- Gym creation is restricted to users with the **admin** role.

## ⚙️ Non-Functional Requirements (RNFs)

- All user passwords are **hashed** using bcryptjs.  
- Data persistence in **PostgreSQL**, orchestrated via **Docker Compose**.  
- API performance: all list endpoints are **paginated** (20 items per page).  
- Stateless authentication using **JWT** with support for **refresh tokens**.  
- Role-Based Access Control (RBAC) to restrict critical operations (e.g., validation, gym registration).

## 🧰 Tech Stack

- **Runtime & Framework**: Node.js 20, TypeScript, Fastify  
- **ORM & Database**: Prisma ORM, PostgreSQL (via Docker)  
- **Authentication & Security**: @fastify/jwt, bcryptjs, Zod (schema validation)  
- **Utilities**: dayjs, dotenv  
- **Testing**:  
  - Vitest (unit & integration tests)  
  - In-memory repository pattern for isolating business logic  
  - Supertest for HTTP/E2E tests  
- **Tooling**: TSX (TypeScript execution), TSUP (bundling), ESLint, Prettier

## 📋 Developer Notes

- **Architecture**: Clean Architecture / Use Cases layer for application logic under `src/use-cases`.  
- **Patterns**:  
  - Repository Pattern (Prisma and in-memory implementations)  
  - SOLID principles to ensure maintainable and testable code.  
- **Validation**: Zod schemas enforce request and response contracts.  
- **Authentication**: JWT & Refresh Token flows implemented with `@fastify/jwt`.  
- **RBAC**: Fine-grained role checks for admin-only endpoints.  
- **Docker**: `docker-compose.yml` sets up PostgreSQL and environment for local development.

## 📂 Project Structure

```plain
├── docker-compose.yml
├── prisma
│   ├── schema.prisma
│   └── migrations
└── src
    ├── @types
    ├── http
    │   ├── controllers
    │   └── middlewares
    ├── lib
    ├── repositories
    │   ├── in-memory
    │   └── prisma
    ├── use-cases
    │   ├── errors
    │   └── factories
    └── utils
```

## 🧪 Testing

1. **Unit tests**: `npm run test:unit` — covering use-cases and repositories.  
2. **Integration/E2E tests**: `npm run test:e2e` — running against a test database.  
3. **Coverage**: `npm run coverage` — to generate coverage reports.

## 🚀 Getting Started

1. **Clone the repo**

```bash
git clone <repository-url>
cd gym-checkin
```

2. **Environment Variables**

Copy `.env.example` to `.env` and configure your database and JWT secrets.

3. **Start services**

```bash
docker-compose up -d
```

4. **Run migrations**

```bash
npx prisma migrate dev
```

5. **Start the server**

```bash
npm run dev
```
