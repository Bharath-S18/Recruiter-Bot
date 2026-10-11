DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS candidates;

CREATE TABLE candidates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  current_title VARCHAR(150) NOT NULL,
  years_experience INTEGER NOT NULL,
  skills TEXT[] NOT NULL,
  culture_fit VARCHAR(100) NOT NULL,
  availability VARCHAR(100) NOT NULL,
  location VARCHAR(150) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  required_skills TEXT[] NOT NULL,
  min_experience INTEGER NOT NULL,
  preferred_culture VARCHAR(100) NOT NULL,
  availability_needed VARCHAR(100) NOT NULL,
  location VARCHAR(150) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
