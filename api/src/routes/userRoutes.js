import { Router } from 'express';
import {
  getUserProfile,
  followOrUnfollowUser,
  getSuggestedUsers,
} from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import checkId from '../middlewares/checkId.js';
import { MONGO_ID_REGEX as idRegex } from '../utils/constants.js';

const router = Router();

// private routes
router.get('/:username/profile', auth, getUserProfile);
router.post(`/:id${idRegex}/follow`, auth, checkId, followOrUnfollowUser);
router.get('/suggested', auth, getSuggestedUsers);

export default router;
