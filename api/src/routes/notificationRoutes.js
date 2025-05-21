import { Router } from 'express';
import * as notificationController from '../controllers/notificationController';
import { auth } from '../middlewares';

const router = Router();

router.route('/')
    .get(auth, notificationController.getNotifications)
    .delete(auth, notificationController.deleteNotifications);

export default router;
