import express from 'express';
import candidateRoutes from './routes/candidates.js';
import jobRoutes from './routes/jobs.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simple health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Recruiter Bot API',
    endpoints: [
      '/health',
      '/candidates',
      '/jobs',
      '/candidates/:id/matches',
      '/jobs/:id/matches',
    ],
  });
});

// Register feature routes
app.use('/candidates', candidateRoutes);
app.use('/jobs', jobRoutes);

export default app;