import { Router } from 'express';
import * as userController from '../controllers/userController';
import { auth, checkId } from '../middlewares';
import { MONGO_ID_REGEX as idRegex } from '../utils/constants';

const router = Router();
// apply auth middleware to all routes in the router
router.use(auth);
// private routes
router.get('/:username/profile', userController.getUserProfile);
router.post(
  `/:id${idRegex}/follow`,
  checkId,
  userController.followOrUnfollowUser
);
router.get('/suggested', userController.getSuggestedUsers);
router.get('/all', userController.fetchAllUsers);
router.get('/search', userController.searchUsers);
router.put('/:username/profile', userController.updateUserProfile);

export default router;
