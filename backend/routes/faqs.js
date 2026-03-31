import express from 'express';
import { getAllFAQs, createFAQ, updateFAQ, deleteFAQ } from '../controllers/faqController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllFAQs);

// Protected routes
router.post('/', authenticateToken, createFAQ);
router.put('/:id', authenticateToken, updateFAQ);
router.delete('/:id', authenticateToken, deleteFAQ);

export default router;
