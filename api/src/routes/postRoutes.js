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
} from '../controllers/postController.js';
// middlewares
import auth from '../middlewares/auth.js';
import checkId from '../middlewares/checkId.js';
import { MONGO_ID_REGEX as idRegex } from '../utils/constants.js';

const router = Router();

// private routes
router.post('/', auth, createPost);
router.get(`/:id${idRegex}`, auth, checkId, getSpecificPost);
router.get('/recents', auth, getRecentPosts);
router.get('/:username', auth, getUserPosts);
router.get('/', auth, getPostsByIds);
router.get('/infinite', auth, getInfinitePosts);
router.get('/search', auth, searchPosts);
router.put(`/:id${idRegex}`, auth, checkId, updatePost);
router.delete(`/:id${idRegex}`, auth, checkId, deletePost);
router.post(`/:id${idRegex}/like`, auth, checkId, likeOrUnlikePost);
router.post(`/:id${idRegex}/save`, auth, checkId, saveOrUnsavePost);

export default router;
