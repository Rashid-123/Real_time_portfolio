import express from 'express';
import { getPortfolioData } from '../services/portfolio_service.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const data = await getPortfolioData();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
});

export default router;