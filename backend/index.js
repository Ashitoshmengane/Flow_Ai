import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import connectDB from './db/connect.js';
import askAiRoutes from './routes/askAi.js';
import saveRoutes from './routes/save.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

// CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Handle preflight for all routes
app.options('*', cors()); 

app.use(express.json());

// Routes
app.use('/api/ask-ai', askAiRoutes);
app.use('/api/save', saveRoutes);

// Database Connection and Server Startup
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => 
    console.log(`✅ Backend running on port ${PORT}`)
  );
});