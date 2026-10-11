-- Question 1: List currently open job postings and their recruiters.
SELECT
  jp.id,
  jp.title,
  jp.department,
  jp.opened_date,
  r.name AS recruiter_name
FROM job_postings AS jp
JOIN recruiters AS r
  ON r.id = jp.recruiter_id
WHERE jp.status = 'open'
ORDER BY jp.id;

-- Question 2: Count applicants who reached the Final stage for each job posting.
SELECT
  jp.id AS job_posting_id,
  jp.title,
  COUNT(DISTINCT i.applicant_id) AS final_stage_applicants
FROM job_postings AS jp
LEFT JOIN interviews AS i
  ON i.job_posting_id = jp.id
  AND i.stage = 'Final'
GROUP BY jp.id, jp.title
ORDER BY jp.id;

-- Question 3: Find people who effectively applied to more than one job posting.
-- Lower-casing email handles duplicate people whose email casing differs.
SELECT
  LOWER(a.email) AS normalized_email,
  MIN(a.full_name) AS applicant_name,
  COUNT(DISTINCT i.job_posting_id) AS job_postings_applied_to
FROM applicants AS a
JOIN interviews AS i
  ON i.applicant_id = a.id
GROUP BY LOWER(a.email)
HAVING COUNT(DISTINCT i.job_posting_id) > 1
ORDER BY normalized_email;

-- Question 4: Final-stage conversion rate for recruiters with at least 3 Final interviews.
SELECT
  r.id AS recruiter_id,
  r.name AS recruiter_name,
  COUNT(*) AS total_final_interviews,
  COUNT(*) FILTER (WHERE i.outcome = 'passed') AS passed_final_interviews,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE i.outcome = 'passed') / COUNT(*),
    2
  ) AS final_conversion_rate_percent
FROM recruiters AS r
JOIN job_postings AS jp
  ON jp.recruiter_id = r.id
JOIN interviews AS i
  ON i.job_posting_id = jp.id
  AND i.stage = 'Final'
GROUP BY r.id, r.name
HAVING COUNT(*) >= 3
ORDER BY final_conversion_rate_percent DESC, r.id;

-- Question 5 (Bonus): Recruiter with the most successful Final placements per department.
WITH recruiter_placements AS (
  SELECT
    jp.department,
    r.id AS recruiter_id,
    r.name AS recruiter_name,
    COUNT(*) AS successful_placements
  FROM recruiters AS r
  JOIN job_postings AS jp
    ON jp.recruiter_id = r.id
  JOIN interviews AS i
    ON i.job_posting_id = jp.id
    AND i.stage = 'Final'
    AND i.outcome = 'passed'
  GROUP BY jp.department, r.id, r.name
),
ranked_recruiters AS (
  SELECT
    department,
    recruiter_id,
    recruiter_name,
    successful_placements,
    RANK() OVER (
      PARTITION BY department
      ORDER BY successful_placements DESC
    ) AS department_rank
  FROM recruiter_placements
)
SELECT
  department,
  recruiter_id,
  recruiter_name,
  successful_placements
FROM ranked_recruiters
WHERE department_rank = 1
ORDER BY department;
