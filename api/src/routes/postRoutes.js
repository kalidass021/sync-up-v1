import { Router } from 'express';
import {
  createPost,
  getSpecificPost,
  getRecentPosts,
  getUserPosts,
  getPostsByIds,
  getInfinitePosts,
  searchPosts,
  updatePost,
  deletePost,
  likeOrUnlikePost,
  saveOrUnsavePost,
} from '../controllers/postController';
// middlewares
import { auth, checkId } from '../middlewares';
import { MONGO_ID_REGEX as idRegex } from '../utils/constants';

const router = Router();
// apply auth middleware to all routes in the router
router.use(auth);

// private routes
router.post('/', createPost);
router.get(`/:id${idRegex}`, checkId, getSpecificPost);
router.get('/recents', getRecentPosts);
router.get('/', getPostsByIds);
router.get('/infinite', getInfinitePosts);
router.get('/search', searchPosts);
router.get('/:username', getUserPosts); // avoid /:username get executed for /infinite and /search
router.put(`/:id${idRegex}`, checkId, updatePost);
router.delete(`/:id${idRegex}`, checkId, deletePost);
router.post(`/:id${idRegex}/like`, checkId, likeOrUnlikePost);
router.post(`/:id${idRegex}/save`, checkId, saveOrUnsavePost);

export default router;
