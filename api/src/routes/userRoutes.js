import  {Router} from 'express';
import { getUserProfile } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = Router();

// private routes
router.get('/:username', auth, getUserProfile);

export default router;