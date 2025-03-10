import { Router } from 'express';
import {
  signup,
  signin,
  signout,
  getCurrentUserProfile,
} from '../controllers/authController';
import { auth } from '../middlewares';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
// private route
router.get('/profile', auth, getCurrentUserProfile);

export default router;
