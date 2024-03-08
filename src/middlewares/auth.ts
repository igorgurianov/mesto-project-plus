import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface ISessionRequest extends Request {
  user?: string | JwtPayload
}

// eslint-disable-next-line consistent-return
export default (req: ISessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch {
    res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};
