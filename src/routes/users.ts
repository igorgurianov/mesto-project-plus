import { Router } from 'express';
import {
  userIdSchema, userNameAboutSchema, userAvatarSchema,
} from '../utils/celebrate-schemas/user';
import {
  getAllUsers, getUserById, updateAvatar, updateProfile, getMyInfo,
} from '../controllers/users';

const router = Router();

router.get('/', getAllUsers);
router.get('/me', getMyInfo);
router.patch('/me', userNameAboutSchema, updateProfile);
router.patch('/me/avatar', userAvatarSchema, updateAvatar);
router.get('/:userId', userIdSchema, getUserById);

export default router;
