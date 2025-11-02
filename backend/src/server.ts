import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import rateLimit from 'express-rate-limit';
import portfolioRoutes from './routes/portfolio_routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 1 * 60 * 100,
  max : 15 ,
  message: {error:'Too many requiests , please try againg later.'},
  standardHeaders:true,
  legacyHeaders:false,
})
app.use(limiter);


app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://portfolio-theta-inky-tbm0md45x0.vercel.app/" , 
    credentials: true, 
  })
);
app.use(express.json());

// Connect to database
connectDB();


app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});


app.use('/api/portfolio', portfolioRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});