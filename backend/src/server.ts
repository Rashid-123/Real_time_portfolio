import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import portfolioRoutes from './routes/portfolio_routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
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