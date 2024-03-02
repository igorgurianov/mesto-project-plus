import { NextFunction, Response, Request } from 'express';
import { isCelebrateError } from 'celebrate';

const celebrateErrorHandler = (err: any, req: Request, res:Response, next: NextFunction) => {
  if (!isCelebrateError(err)) return next(err);
  return res.status(400).send({ message: 'Переданы некорректные данные' });
};

export default celebrateErrorHandler;
