import { Router } from 'express';
import { POST_ENDPOINTS } from '../constants/appConstants';
import * as postController from '../controllers/postController';
// middlewares
import { auth, checkId } from '../middlewares';
import { MONGO_ID_REGEX as idRegex } from '../utils/constants';

const router = Router();

// apply auth middleware to all routes in the router
router.use(auth);
// private routes
router.post(POST_ENDPOINTS.CREATE_POST, postController.createPost);
router.get(
  POST_ENDPOINTS.GET_SPECIFIC_POST,
  checkId,
  postController.getSpecificPost
);
router.get(POST_ENDPOINTS.GET_RECENT_POSTS, postController.getRecentPosts);
router.get(POST_ENDPOINTS.GET_POSTS_BY_IDS, postController.getPostsByIds);
router.get(POST_ENDPOINTS.GET_INFINITE_POSTS, postController.getInfinitePosts);
router.get(POST_ENDPOINTS.SEARCH_POSTS, postController.searchPosts);
router.get(
  POST_ENDPOINTS.FETCH_MEME_OF_THE_DAY,
  postController.fetchMemeOfTheDay
);
router.get(POST_ENDPOINTS.GET_USER_POSTS, postController.getUserPosts); // avoid /:username get executed for /infinite and /search
router.put(POST_ENDPOINTS.UPDATE_POST, checkId, postController.updatePost);
router.delete(POST_ENDPOINTS.DELETE_POST, checkId, postController.deletePost);
router.post(
  POST_ENDPOINTS.LIKE_OR_UNLIKE_POST,
  checkId,
  postController.likeOrUnlikePost
);
router.post(
  POST_ENDPOINTS.SAVE_OR_UNSAVE_POST,
  checkId,
  postController.saveOrUnsavePost
);

export default router;
