import { Router } from 'express';
import {
  userIdSchema, userAllDataSchema, userNameAboutSchema, userAvatarSchema,
} from '../utils/celebrate-schemas/user';
import {
  createUser, getAllUsers, getUserById, updateAvatar, updateProfile,
} from '../controllers/users';

const router = Router();

router.get('/users', getAllUsers);

router.get('/users/:userId', userIdSchema, getUserById);

router.post(
  '/users',
  userAllDataSchema,
  createUser,
);

router.patch('/users/me', userNameAboutSchema, updateProfile);

router.patch('/users/me/avatar', userAvatarSchema, updateAvatar);

export default router;
