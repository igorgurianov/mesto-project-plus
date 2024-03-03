import { Router } from 'express';
import {
  userIdSchema, userAllDataSchema, userNameAboutSchema, userAvatarSchema,
} from '../utils/celebrate-schemas/user';
import {
  createUser, getAllUsers, getUserById, updateAvatar, updateProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getAllUsers);

router.get('/:userId', userIdSchema, getUserById);

router.post(
  '/',
  userAllDataSchema,
  createUser,
);

router.patch('/me', userNameAboutSchema, updateProfile);

router.patch('/me/avatar', userAvatarSchema, updateAvatar);

export default router;
