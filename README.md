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

## Design decisions and trade-offs

The database uses two main tables: `candidates` and `jobs`. Skills and required
skills are stored as PostgreSQL text arrays. This keeps the schema small and
the seed data easy to understand for this assignment. A more normalized
production design could use separate `skills` and join tables, which would make
skill reuse and validation stronger but would also add queries and complexity
that are not necessary for this take-home project.

The matching algorithm gives skills the highest weight at 40% because matching
the required technical capabilities is the most important signal. Experience
fit contributes 25%, culture fit contributes 20%, and availability contributes
15%. Skill overlap is calculated from the proportion of required skills the
candidate has. Experience is compared with the job's minimum, and both
additional factors provide useful ranking context. The final score is rounded
to a value from 0 to 100 and results are sorted in descending order.

The service calculates matches in application code after retrieving the
relevant records with SQL. This makes the scoring rules easy to read, test, and
change. For a much larger dataset, the matching calculation could be moved
closer to the database or optimized with precomputed/search indexes, but the
current approach is appropriate for the small assignment dataset and keeps the
business logic separate from the data-access layer.

## AI tools

I used an AI assistant through Copilot SDK in VS Code while working on this
assignment. I used it to clarify the assignment requirements, discuss the
database and API structure, draft parts of the implementation, troubleshoot
the Supabase connection, and review the README and verification steps. I
reviewed the generated changes, ran the database initialization and API
endpoints locally, and made sure the final design and scoring decisions were
understood before submitting.
