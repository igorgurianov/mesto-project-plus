import { Router } from 'express';
import cardRouter from './cards';
import userRouter from './users';
import signinRouter from './signin';
import signupRouter from './signup';
import auth from '../middlewares/auth';

const router = Router();

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

export default router;
