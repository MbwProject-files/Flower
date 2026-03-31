import express from 'express';
import { getCTA, updateCTA, getContactInfo, updateContactInfo, getFooter, createFooterColumn, updateFooterColumn, deleteFooterColumn } from '../controllers/settingsController.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// CTA routes
router.get('/cta', getCTA);
router.put('/cta', authenticateToken, upload.single('background_image'), updateCTA);

// Contact Info routes
router.get('/contact', getContactInfo);
router.put('/contact', authenticateToken, updateContactInfo);

// Footer routes
router.get('/footer', getFooter);
router.post('/footer', authenticateToken, createFooterColumn);
router.put('/footer/:id', authenticateToken, updateFooterColumn);
router.delete('/footer/:id', authenticateToken, deleteFooterColumn);

export default router;
