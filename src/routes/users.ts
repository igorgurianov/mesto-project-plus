import { Router } from 'express';
import {
  createUser, getAllUsers, getUserById, updateAvatar, updateProfile,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', createUser);
userRouter.get('/users', getAllUsers);

userRouter.patch('/users/me', updateProfile);
userRouter.patch('/users/me/avatar', updateAvatar);

export default userRouter;
