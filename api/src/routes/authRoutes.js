import { Router } from 'express';
import { AUTH_ENDPOINTS } from '../constants/appConstants';
import * as authController from '../controllers/authController';
import { auth } from '../middlewares';

const router = Router();

router.get(AUTH_ENDPOINTS.AUTH_CHECK, auth, authController.authCheck);
router.post(AUTH_ENDPOINTS.SIGNUP, authController.signup);
router.post(AUTH_ENDPOINTS.SIGNIN, authController.signin);
router.post(AUTH_ENDPOINTS.SIGNOUT, authController.signout);
// private route
router.get(
  AUTH_ENDPOINTS.GET_CURRENT_USER_PROFILE,
  auth,
  authController.getCurrentUserProfile
);

export default router;
