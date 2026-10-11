# Recruiter Bot

A small REST API for ranking fictional candidates against job openings.

This project implements the Backend Developer Intern take-home assignment using:

- Node.js and Express
- Supabase PostgreSQL
- `pg` with handwritten SQL
- JavaScript ES modules

## Requirements

- Node.js 18+
- A Supabase PostgreSQL connection string

## Setup

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Copy `.env.example` to `.env`.

3. Set `SUPABASE_DB_URL` in `.env` to your Supabase PostgreSQL connection string:

   ```text
   SUPABASE_DB_URL=postgres://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres
   PORT=3000
   ```

4. Create the tables and load the 15 candidates and 6 jobs:

   ```powershell
   node scripts/init-db.js
   ```

5. Start the API:

   ```powershell
   npm start
   ```

The server runs at `http://localhost:3000`.

## Endpoints

List candidates:

```powershell
curl.exe http://localhost:3000/candidates
```

List jobs:

```powershell
curl.exe http://localhost:3000/jobs
```

Get ranked jobs for a candidate:

```powershell
curl.exe http://localhost:3000/candidates/1/matches
```

Get ranked candidates for a job:

```powershell
curl.exe http://localhost:3000/jobs/1/matches
```

The matching responses include the candidate or job, the total number of matches,
each match's score breakdown, a final score from 0 to 100, and a short reason.

## Matching algorithm

Each candidate-job pair is scored using:

- Skill overlap: 40%
- Experience fit: 25%
- Culture fit: 20%
- Availability: 15%

Skill overlap and experience fit are the required signals from the assignment.
Culture and availability provide additional ranking context. Results are sorted
from the highest final score to the lowest.

## Project structure

```text
sql/
  schema.sql       Database tables
  seed.sql         Candidate and job seed data
scripts/
  init-db.js       Runs the schema and seed SQL
src/
  config/db.js     PostgreSQL connection pool
  controllers/     Request handlers
  routes/          Express routes
  services/        Matching algorithm
```

All database operations use handwritten parameterized SQL through `pg`; no ORM
or query builder is used.
