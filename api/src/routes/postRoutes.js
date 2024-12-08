import { Router } from 'express';
import { createPost, deletePost, getRecentPosts } from '../controllers/postController.js';
// middlewares
import auth from '../middlewares/auth.js';

const router = Router();

// private routes
router.post('/', auth, createPost);
router.get('/recents', auth, getRecentPosts);
router.delete('/:id', auth, deletePost);

export default router;
