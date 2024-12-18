import { Router } from 'express';
import {
  signup,
  signin,
  signout,
  getCurrentUserProfile,
} from '../controllers/authController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
// private route
router.get('/profile', auth, getCurrentUserProfile);

export default router;
