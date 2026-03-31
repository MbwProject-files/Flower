import express from 'express';
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllTestimonials);

// Protected routes
router.post('/', authenticateToken, upload.single('image'), createTestimonial);
router.put('/:id', authenticateToken, upload.single('image'), updateTestimonial);
router.delete('/:id', authenticateToken, deleteTestimonial);

export default router;
