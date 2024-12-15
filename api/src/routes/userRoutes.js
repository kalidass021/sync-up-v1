import  {Router} from 'express';
import { getUserProfile, followOrUnfollowUser } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import checkId from '../middlewares/checkId.js';
import {MONGO_ID_REGEX as idRegex} from '../utils/constants.js';

const router = Router();

// private routes
router.get('/:username', auth, getUserProfile);
router.post(`/:id${idRegex}/follow`, auth, checkId, followOrUnfollowUser);

export default router;