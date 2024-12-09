import { Router } from 'express';
import { getNotifications, deleteNotifications } from '../controllers/notificationController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', auth, getNotifications);
router.delete('/', auth, deleteNotifications);

export default router;
