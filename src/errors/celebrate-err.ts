import { NextFunction, Response, Request } from 'express';
import { isCelebrateError } from 'celebrate';
import { HTTP_STATUS_BAD_REQUEST } from '../utils/responseCodes';

const celebrateErrorHandler = (err: any, req: Request, res:Response, next: NextFunction) => {
  if (!isCelebrateError(err)) return next(err);
  return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
};

export default celebrateErrorHandler;
