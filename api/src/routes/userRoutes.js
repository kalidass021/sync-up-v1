import { Router } from 'express';
import {
  getUserProfile,
  followOrUnfollowUser,
  getSuggestedUsers,
  fetchAllUsers,
  searchUsers,
  updateUserProfile,
} from '../controllers/userController';
import { auth, checkId } from '../middlewares';
import { MONGO_ID_REGEX as idRegex } from '../utils/constants';

const router = Router();

// private routes
router.get('/:username/profile', auth, getUserProfile);
router.post(`/:id${idRegex}/follow`, auth, checkId, followOrUnfollowUser);
router.get('/suggested', auth, getSuggestedUsers);
router.get('/all', auth, fetchAllUsers);
router.get('/search', auth, searchUsers);
router.put('/:username/profile', auth, updateUserProfile);

export default router;
