import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CREATED } from '../utils/responseCodes';
import User from '../models/user';
import { IAuthRequest } from './cards';

type TFields ={
  avatar?: string;
  name?: string;
  about?: string
}

function userDecorator(req:IAuthRequest, res: Response, next: NextFunction) {
  const _id = req.user?._id;

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

export const createUser = async (req:Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  const hash = await bcrypt.hash(password, 10);

  return User.create({
    name, about, avatar, email, password: hash,
  })
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

export const login = (req:Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

export const getMyInfo = (req:IAuthRequest, res: Response, next: NextFunction) => {
  const _id = req.user?._id;

  return User.findById(_id).then((user) => {
    res.send({ user });
  })
    .catch(next);
};
