import { Router } from 'express';
import { USER_ENDPOINTS } from '../constants/appConstants';
import * as userController from '../controllers/userController';
import { auth, checkId } from '../middlewares';

const router = Router();
// apply auth middleware to all routes in the router
router.use(auth);
// private routes
router.get(USER_ENDPOINTS.GET_USER_PROFILE, userController.getUserProfile);
router.post(
  USER_ENDPOINTS.FOLLOW_OR_UNFOLLOW_USER,
  checkId,
  userController.followOrUnfollowUser
);
router.get(
  USER_ENDPOINTS.FETCH_SUGGESTED_USERS,
  userController.fetchSuggestedUsers
);
router.get(USER_ENDPOINTS.FETCH_ALL_USERS, userController.fetchAllUsers);
router.get(USER_ENDPOINTS.SEARCH_USERS, userController.searchUsers);
router.put(
  USER_ENDPOINTS.UPDATE_USER_PROFILE,
  userController.updateUserProfile
);

export default router;
