import { Router } from 'express';
import {
  createPost,
  deletePost,
  getSpecificPost,
  getRecentPosts,
  likeOrUnlikePost,
  saveOrUnsavePost,
} from '../controllers/postController.js';
// middlewares
import auth from '../middlewares/auth.js';
import checkId from '../middlewares/checkId.js';
import { MONGO_ID_REGEX } from '../utils/constants.js';

const router = Router();
const idRegex = MONGO_ID_REGEX;

// private routes
router.post('/', auth, createPost);
router.get(`/:id${idRegex}`, auth, checkId, getSpecificPost);
router.get('/recents', auth, getRecentPosts);
router.delete(`/:id${idRegex}`, auth, checkId, deletePost);
router.post(`/:id${idRegex}/like`, auth, checkId, likeOrUnlikePost);
router.post(`/:id${idRegex}/save`, auth, checkId, saveOrUnsavePost);

export default router;
