import express from 'express';
import { 
  getHeader, 
  updateHeader, 
  getWhyChooseUs, 
  createWhyChooseUs, 
  updateWhyChooseUs, 
  deleteWhyChooseUs,
  getDiscoveries,
  createDiscovery,
  updateDiscovery,
  deleteDiscovery
} from '../controllers/cmsController.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Header routes
router.get('/header', getHeader);
router.put('/header', authenticateToken, upload.single('logo'), updateHeader);

// Why Choose Us routes
router.get('/why-choose-us', getWhyChooseUs);
router.post('/why-choose-us', authenticateToken, upload.single('icon_image'), createWhyChooseUs);
router.put('/why-choose-us/:id', authenticateToken, upload.single('icon_image'), updateWhyChooseUs);
router.delete('/why-choose-us/:id', authenticateToken, deleteWhyChooseUs);

// Discoveries routes
router.get('/discoveries', getDiscoveries);
router.post('/discoveries', authenticateToken, upload.single('image'), createDiscovery);
router.put('/discoveries/:id', authenticateToken, upload.single('image'), updateDiscovery);
router.delete('/discoveries/:id', authenticateToken, deleteDiscovery);

export default router;
