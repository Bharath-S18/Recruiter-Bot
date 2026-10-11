function normalizeText(value) {
  return String(value ?? '').trim().toLowerCase();
}

function parseAvailability(value) {
  const text = normalizeText(value);

  if (!text) return 999;
  if (text.includes('immediately') || text.includes('asap') || text.includes('now')) return 0;
  if (text.includes('1 week') || text.includes('one week')) return 1;
  if (text.includes('2 weeks') || text.includes('two weeks')) return 2;
  if (text.includes('3 weeks') || text.includes('three weeks')) return 3;
  if (text.includes('1 month') || text.includes('one month')) return 4;
  if (text.includes('2 months') || text.includes('two months')) return 8;

  return 999;
}

export function calculateSkillScore(candidateSkills = [], requiredSkills = []) {
  const candidateSet = new Set((candidateSkills || []).map((skill) => normalizeText(skill)));
  const required = Array.isArray(requiredSkills) ? requiredSkills : [];

  if (required.length === 0) return 0;

  const matchedSkills = required.filter((skill) => candidateSet.has(normalizeText(skill)));
  const coverage = (matchedSkills.length / required.length) * 100;
  const bonus = candidateSet.size >= required.length ? 10 : 0;

  return Math.min(100, Math.round(coverage + bonus));
}

export function calculateExperienceScore(candidateYears = 0, minimumExperience = 0) {
  const candidate = Number(candidateYears) || 0;
  const minimum = Number(minimumExperience) || 0;

  if (!candidate || !minimum) return 0;

  const ratio = (candidate / minimum) * 100;
  return Math.min(100, Math.round(ratio));
}

export function calculateCultureFitScore(candidateCulture = '', jobCulture = '') {
  const candidate = normalizeText(candidateCulture);
  const job = normalizeText(jobCulture);

  if (!candidate || !job) return 50;
  if (candidate === job) return 100;

  const sharedWords = [
    'analytical',
    'structured',
    'collaborative',
    'innovative',
    'friendly',
    'team-oriented',
    'process-driven',
    'warm',
    'bold',
    'decisive',
    'direct',
    'mission-driven',
  ];

  const candidateHasSharedWord = sharedWords.some((word) => candidate.includes(word) && job.includes(word));
  if (candidateHasSharedWord) return 75;

  if (candidate.includes(job) || job.includes(candidate)) return 80;

  return 60;
}

export function calculateAvailabilityScore(candidateAvailability = '', requiredAvailability = '') {
  const candidateWeeks = parseAvailability(candidateAvailability);
  const requiredWeeks = parseAvailability(requiredAvailability);

  if (candidateWeeks === 999 || requiredWeeks === 999) return 50;

  const difference = requiredWeeks - candidateWeeks;
  if (difference <= 0) return 100;

  return Math.max(0, 100 - (difference * 25));
}

export function buildMatchReason(candidate, job, breakdown) {
  const skillsText = breakdown.skillScore >= 80
    ? 'Strong skill overlap'
    : breakdown.skillScore >= 60
      ? 'Good skill overlap'
      : 'Some skill overlap';

  const experienceText = breakdown.experienceScore >= 80
    ? 'Experience is comfortably above the minimum requirement'
    : breakdown.experienceScore >= 60
      ? 'Experience is in line with the role requirement'
      : 'Experience is somewhat below the minimum requirement';

  const cultureText = breakdown.cultureScore >= 80
    ? 'Culture fit is a strong match'
    : 'Culture fit is acceptable but not a perfect match';

  const availabilityText = breakdown.availabilityScore >= 80
    ? 'Availability lines up well with the job timeline'
    : 'Availability is workable but not ideal for the role';

  return `${skillsText}. ${experienceText}. ${cultureText}. ${availabilityText}.`;
}

export function scoreCandidateForJob(candidate, job) {
  const skillScore = calculateSkillScore(candidate.skills, job.required_skills);
  const experienceScore = calculateExperienceScore(candidate.years_experience, job.min_experience);
  const cultureScore = calculateCultureFitScore(candidate.culture_fit, job.preferred_culture);
  const availabilityScore = calculateAvailabilityScore(candidate.availability, job.availability_needed);

  const finalScore = Math.round(
    (skillScore * 0.4) +
      (experienceScore * 0.25) +
      (cultureScore * 0.2) +
      (availabilityScore * 0.15)
  );

  return {
    candidateId: candidate.id,
    candidateName: candidate.name,
    jobId: job.id,
    jobTitle: job.title,
    skillScore,
    experienceScore,
    cultureScore,
    availabilityScore,
    finalScore,
    reason: buildMatchReason(candidate, job, {
      skillScore,
      experienceScore,
      cultureScore,
      availabilityScore,
    }),
  };
}

export function rankCandidatesForJob(job, candidates = []) {
  return candidates
    .map((candidate) => scoreCandidateForJob(candidate, job))
    .sort((a, b) => b.finalScore - a.finalScore);
}

export function rankJobsForCandidate(candidate, jobs = []) {
  return jobs
    .map((job) => scoreCandidateForJob(candidate, job))
    .sort((a, b) => b.finalScore - a.finalScore);
}
