import { Router } from 'express';
import {
  getNotifications,
  deleteNotifications,
} from '../controllers/notificationController';
import { auth } from '../middlewares';

const router = Router();

router.route('/')
    .get(auth, getNotifications)
    .delete(auth, deleteNotifications);

export default router;
