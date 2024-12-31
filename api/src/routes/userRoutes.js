import { Router } from 'express';
import {
  getUserProfile,
  followOrUnfollowUser,
  getSuggestedUsers,
  fetchAllUsers,
  updateUserProfile,
} from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import checkId from '../middlewares/checkId.js';
import { MONGO_ID_REGEX as idRegex } from '../utils/constants.js';

const router = Router();

// private routes
router.get('/:username/profile', auth, getUserProfile);
router.post(`/:id${idRegex}/follow`, auth, checkId, followOrUnfollowUser);
router.get('/suggested', auth, getSuggestedUsers);
router.get('/all', auth, fetchAllUsers);
router.put('/:username/profile', auth, updateUserProfile);

export default router;
