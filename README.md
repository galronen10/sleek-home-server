# Sleek Home Server

A NestJS server using TypeORM, Redis (BullMQ), and PostgreSQL to manage and analyze endpoint file activity.

---

## 📦 Tech Stack

* **NestJS** (TypeScript)
* **TypeORM** with PostgreSQL
* **Redis** (BullMQ for queue processing)
* **Docker** & Docker Compose

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd sleek-home-server
```

### 2. Setup environment (Optional if using default `docker-compose` values)

Create a `.env` file:

```env
NODE_ENV=production
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=sleek_home
REDIS_HOST=redis
REDIS_PORT=6379
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Start services

```bash
npm run docker:up
```

Or use Docker Compose directly:

```bash
docker-compose up --build
```

### 4. Seed sample endpoints (optional)

"Seeding" means populating the database with **sample or development data**. This is useful for local testing or development demos.

You can run the seed script using:

```bash
npm run docker:seed
```

Or directly using the package.json script:

```bash
docker-compose exec server npm run seed-endpoints:prod
```

This script inserts multiple endpoints and malicious files to help simulate different statuses in the system.

---


## 🧰 Development Usage (Without Docker)

To run locally using `npm` only:

1. Install dependencies:

```bash
npm install
```

2. Start PostgreSQL and Redis locally or via Docker (see Redis notes below).

3. Create your `.env` file in the root:

```env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=sleek_home
REDIS_HOST=localhost
REDIS_PORT=6379
```

4. Run the server in watch mode:

```bash
npm run start:dev
```

5. Optionally seed the database:

```bash
npm run seed-endpoints
```

---

## 🧪 Linting

Run ESLint to check for code style and unused variables:

```bash
npm run lint
```

This will use your project's configuration to ensure clean, consistent code.

---

## 📂 Project Structure (highlights)

```
src/
├── entities/                # TypeORM entities
├── modules/
│   ├── endpoints/           # Endpoint business logic
│   └── queue/               # BullMQ queue + processors
├── app.module.ts            # Root app module
├── main.ts                  # App entry point
├── redis.config.ts          # Redis client setup

.dockerignore
.dockerfile
.docker-compose.yml
.env
.gitignore
.prettierrc
.eslint.config.mjs
```

---

## 💡 Useful Commands for local

```bash
npm run start:dev     # Start local dev server
npm run build         # Build project
npm run lint          # Lint and check code style
npm run seed-endpoints  # Seed the database with test data
```

---

## 💡 Useful Commands for docker

```bash
npm run docker:up           # Start app + dependencies
npm run docker:seed         # Run seed script manually
npm run docker:down         # Stop and remove containers
npm run docker:rebuild      # Rebuild the app only
npm run docker:Restart      # Restart only app
```

---
## ✅ Health Check

To test Redis manually:

```bash
docker run -it --rm redis redis-cli -h localhost -p 6379
ping
# Should return: PONG
```

---

## 📝 Assumptions

* every time endpoint send a detect request the nextExpectedCallDate property in the request is after the current time and after that was received in the previous request if there was one

