import express from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Protected routes
router.post('/', authenticateToken, upload.single('image'), createCategory);
router.put('/:id', authenticateToken, upload.single('image'), updateCategory);
router.delete('/:id', authenticateToken, deleteCategory);

export default router;
