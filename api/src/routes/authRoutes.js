import { Router } from 'express';
import * as authController from '../controllers/authController';
import { auth } from '../middlewares';

const router = Router();

router.get('/', auth, authController.authCheck);
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);
// private route
router.get('/profile', auth, authController.getCurrentUserProfile);

export default router;
