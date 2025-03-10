import { Router } from 'express';
import { getNotifications, deleteNotifications } from '../controllers/notificationController';
import { auth } from '../middlewares';

const router = Router();

router.get('/', auth, getNotifications);
router.delete('/', auth, deleteNotifications);

export default router;
