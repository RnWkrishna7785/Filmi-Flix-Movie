import express from 'express';
import { getUsers, toggleFavorite } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getUsers);
router.post('/favorite', protect, toggleFavorite);

export default router;
