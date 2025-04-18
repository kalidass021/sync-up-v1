import { Router } from 'express';
import {
  authCheck,
  signup,
  signin,
  signout,
  getCurrentUserProfile,
} from '../controllers/authController';
import { auth } from '../middlewares';

const router = Router();

router.get('/', auth, authCheck);
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
// private route
router.get('/profile', auth, getCurrentUserProfile);

export default router;
