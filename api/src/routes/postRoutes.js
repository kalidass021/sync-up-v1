import { Router } from 'express';
import * as postController from '../controllers/postController';
// middlewares
import { auth, checkId } from '../middlewares';
import { MONGO_ID_REGEX as idRegex } from '../utils/constants';

const router = Router();
// apply auth middleware to all routes in the router
router.use(auth);

// private routes
router.post('/', postController.createPost);
router.get(`/:id${idRegex}`, checkId, postController.getSpecificPost);
router.get('/recents', postController.getRecentPosts);
router.get('/', postController.getPostsByIds);
router.get('/infinite', postController.getInfinitePosts);
router.get('/search', postController.searchPosts);
router.get('/:username', postController.getUserPosts); // avoid /:username get executed for /infinite and /search
router.put(`/:id${idRegex}`, checkId, postController.updatePost);
router.delete(`/:id${idRegex}`, checkId, postController.deletePost);
router.post(`/:id${idRegex}/like`, checkId, postController.likeOrUnlikePost);
router.post(`/:id${idRegex}/save`, checkId, postController.saveOrUnsavePost);

export default router;
