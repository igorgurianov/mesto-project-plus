import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CREATED } from '../utils/responseCodes';
import User from '../models/user';

type TFields ={
  avatar?: string;
  name?: string;
  about?: string
}

function userDecorator(req:Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const { _id } = req.user;

  return function updateInfo(fields: TFields) {
    return User.findByIdAndUpdate(
      _id,
      fields,
      { new: true, runValidators: true },
    )
      .orFail()
      .then((profile) => res.send({ data: profile }))
      .catch(next);
  };
}

export const updateAvatar = (req:Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  return userDecorator(req, res, next)({ avatar });
};

export const updateProfile = (req:Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  return userDecorator(req, res, next)({ name, about });
};

export const createUser = (req:Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(HTTP_STATUS_CREATED).send({ data: user }))
    .catch(next);
};

export const getAllUsers = (req:Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(next);

export const getUserById = (req:Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};
