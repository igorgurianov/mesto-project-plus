import express, {
  Request, Response, NextFunction,
} from 'express';
import mongoose from 'mongoose';
import errorHandler, { IError } from './errors';
import router from './routes';
import { HTTP_STATUS_NOT_FOUND } from './utils/responseCodes';
import celebrateErrorHandler from './errors/celebrate-err';

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
app.use('/', router);

app.use((req, res, next) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Страница не найдена' });
  next();
});

// Миддлвары ошибок
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  celebrateErrorHandler(err, req, res, next);
});

app.use((err: IError, req: Request, res: Response, next: NextFunction): void => {
  const { message, statusCode } = errorHandler(err);
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`Mesto API is listening! on port - ${PORT}`);
});
