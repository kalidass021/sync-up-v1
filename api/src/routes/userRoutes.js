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
// apply auth middleware to all routes in the router
router.use(auth);
// private routes
router.get('/:username/profile', getUserProfile);
router.post(`/:id${idRegex}/follow`, checkId, followOrUnfollowUser);
router.get('/suggested', getSuggestedUsers);
router.get('/all', fetchAllUsers);
router.get('/search', searchUsers);
router.put('/:username/profile', updateUserProfile);

export default router;
