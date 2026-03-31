import express from 'express';
import { getAllBanners, getBannerById, createBanner, updateBanner, deleteBanner } from '../controllers/bannerController.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllBanners);
router.get('/:id', getBannerById);

// Protected routes
router.post('/', authenticateToken, upload.single('image'), createBanner);
router.put('/:id', authenticateToken, upload.single('image'), updateBanner);
router.delete('/:id', authenticateToken, deleteBanner);

export default router;
