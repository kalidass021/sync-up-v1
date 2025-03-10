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

const regex = /^[a-zA-Z0-9_]+$/;

// private routes
router.post('/', auth, createPost);
router.get(`/:id${idRegex}`, auth, checkId, getSpecificPost);
router.get('/recents', auth, getRecentPosts);
router.get('/', auth, getPostsByIds);
router.get('/infinite', auth, getInfinitePosts);
router.get('/search', auth, searchPosts);
router.get('/:username', auth, getUserPosts); // avoid /:username get executed for /infinite and /search
router.put(`/:id${idRegex}`, auth, checkId, updatePost);
router.delete(`/:id${idRegex}`, auth, checkId, deletePost);
router.post(`/:id${idRegex}/like`, auth, checkId, likeOrUnlikePost);
router.post(`/:id${idRegex}/save`, auth, checkId, saveOrUnsavePost);

export default router;
