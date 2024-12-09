import { Router } from 'express';
import {
  createPost,
  deletePost,
  getRecentPosts,
  likeOrUnlikePost,
  saveOrUnsavePost,
} from '../controllers/postController.js';
// middlewares
import auth from '../middlewares/auth.js';
import checkId from '../middlewares/checkId.js';

const router = Router();

// private routes
router.post('/', auth, createPost);
router.get('/recents', auth, getRecentPosts);
router.delete('/:id', auth, checkId, deletePost);
router.post('/:id/like', auth, checkId, likeOrUnlikePost);
router.post('/:id/save', auth, checkId, saveOrUnsavePost);

export default router;
