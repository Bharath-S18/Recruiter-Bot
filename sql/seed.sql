INSERT INTO candidates (
  name,
  current_title,
  years_experience,
  skills,
  culture_fit,
  availability,
  location
) VALUES
  ('Sherlock Holmes', 'Senior Backend Detective', 7, ARRAY['Node.js', 'PostgreSQL', 'API Design', 'Algorithms', 'Problem Solving'], 'Analytical', 'Available immediately', 'London'),
  ('Tony Stark', 'Rapid Prototyping Engineer', 9, ARRAY['JavaScript', 'React', 'System Design', 'Testing', 'Leadership'], 'Innovative', 'Available in 2 weeks', 'New York'),
  ('Michael Scott', 'Sales Engineer', 6, ARRAY['Sales', 'Demo Delivery', 'Customer Communication', 'Cloud', 'Negotiation'], 'Friendly', 'Available immediately', 'Scranton'),
  ('Ada Lovelace', 'Backend Developer', 5, ARRAY['Node.js', 'Express', 'PostgreSQL', 'SQL', 'Documentation'], 'Structured', 'Available immediately', 'London'),
  ('Alan Turing', 'Security Engineer', 8, ARRAY['Security', 'Cryptography', 'Linux', 'Python', 'Problem Solving'], 'Analytical', 'Available in 1 month', 'Cambridge'),
  ('Grace Hopper', 'Platform Engineer', 10, ARRAY['Linux', 'Docker', 'Kubernetes', 'Monitoring', 'Automation'], 'Process-driven', 'Available immediately', 'Arlington'),
  ('Hermione Granger', 'Full Stack Engineer', 6, ARRAY['JavaScript', 'Node.js', 'React', 'Testing', 'API Design'], 'Collaborative', 'Available in 2 weeks', 'London'),
  ('Elizabeth Bennet', 'Product Analyst', 4, ARRAY['Product Thinking', 'Research', 'Data Analysis', 'Stakeholder Communication', 'SQL'], 'Warm', 'Available immediately', 'Bath'),
  ('James Bond', 'Operations Lead', 9, ARRAY['Operations', 'Risk Management', 'Leadership', 'Security', 'Problem Solving'], 'Decisive', 'Available in 3 weeks', 'London'),
  ('Peter Parker', 'Frontend Engineer', 4, ARRAY['JavaScript', 'CSS', 'React', 'Accessibility', 'Testing'], 'Collaborative', 'Available immediately', 'Queens'),
  ('Darth Vader', 'DevOps Engineer', 8, ARRAY['Linux', 'AWS', 'CI/CD', 'Infrastructure', 'Monitoring'], 'Commanding', 'Available in 1 week', 'Death Star'),
  ('Elon Musk', 'Innovation Engineer', 12, ARRAY['System Design', 'Leadership', 'Prototyping', 'AI', 'Product Vision'], 'Bold', 'Available immediately', 'Austin'),
  ('Captain America', 'Engineering Manager', 11, ARRAY['Leadership', 'Team Building', 'Agile', 'Planning', 'Communication'], 'Team-oriented', 'Available in 2 weeks', 'Washington DC'),
  ('Wonder Woman', 'QA Engineer', 5, ARRAY['Testing', 'Automation', 'API Testing', 'Documentation', 'Problem Solving'], 'Mission-driven', 'Available immediately', 'Themyscira'),
  ('Wolverine', 'Security Analyst', 7, ARRAY['Security', 'Monitoring', 'Incident Response', 'Linux', 'Risk Analysis'], 'Direct', 'Available immediately', 'Canada');

INSERT INTO jobs (
  title,
  required_skills,
  min_experience,
  preferred_culture,
  availability_needed,
  location
) VALUES
  ('Backend Detective', ARRAY['Node.js', 'PostgreSQL', 'API Design', 'Problem Solving', 'Algorithms'], 5, 'Analytical', 'Available immediately', 'London'),
  ('Rapid Prototyping Engineer', ARRAY['JavaScript', 'React', 'System Design', 'Testing', 'Leadership'], 4, 'Innovative', 'Available in 2 weeks', 'New York'),
  ('Sales Engineer', ARRAY['Sales', 'Demo Delivery', 'Customer Communication', 'Cloud', 'Negotiation'], 3, 'Friendly', 'Available immediately', 'Scranton'),
  ('Platform Reliability Engineer', ARRAY['Linux', 'Docker', 'Kubernetes', 'Monitoring', 'Automation'], 5, 'Process-driven', 'Available in 1 week', 'Remote'),
  ('Product Strategy Lead', ARRAY['Product Thinking', 'Stakeholder Communication', 'Roadmapping', 'Data Analysis', 'Leadership'], 6, 'Collaborative', 'Available in 3 weeks', 'Remote'),
  ('Full Stack Systems Engineer', ARRAY['JavaScript', 'Node.js', 'SQL', 'API Design', 'Testing'], 4, 'Team-oriented', 'Available immediately', 'Hybrid');
