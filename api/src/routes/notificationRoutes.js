import { Router } from 'express';
import { NOTIFICATION_ENDPOINTS } from '../constants';
import * as notificationController from '../controllers/notificationController';
import { auth } from '../middlewares';

const router = Router();

router
  .route(NOTIFICATION_ENDPOINTS.PROCESS_NOTIFICATIONS)
  .get(auth, notificationController.getNotifications)
  .delete(auth, notificationController.deleteNotifications);

export default router;
