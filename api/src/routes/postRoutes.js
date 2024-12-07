import { Router } from 'express';
import { createPost } from '../controllers/postController.js';
// middlewares
import auth from '../middlewares/auth.js';

const router = Router();

// private routes
router.post('/', auth, createPost);

export default router;
