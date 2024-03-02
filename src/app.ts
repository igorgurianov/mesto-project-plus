import express, {
  Request, Response, NextFunction,
} from 'express';
import mongoose from 'mongoose';
import celebrateErrorHandler from './errors/celebrate-err';
import { IError } from './errors/not-found-err';
import userRouter from './routes/users';
import cardRouter from './routes/cards';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // @ts-ignore
  req.user = { _id: '65e1c1627a7a297fc0ebeea0' };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

// Роуты
app.use('/', cardRouter);
app.use('/', userRouter);

// Миддлвары ошибок
// app.use(errors());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  celebrateErrorHandler(err, req, res, next);
});

app.use((err: IError, req: Request, res: Response, next: NextFunction): void => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`Mesto API is listening! on port - ${PORT}`);
});
