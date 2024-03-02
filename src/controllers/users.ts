import { NextFunction, Request, Response } from 'express';
import User from '../models/user';

const NotFoundError = require('../errors/not-found-err');
const InvalidDataError = require('../errors/invalid-data-err');

export const createUser = (req:Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => {
      if (!user) throw new InvalidDataError('Ошибка при создании пользователя');
      res.send({ data: user });
    })
    .catch(next);
};

export const getAllUsers = (req:Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(next);

export const getUserById = (req:Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError('Такого пользователя не существует');
      res.send(user);
    })
    .catch(next);
};

export const updateProfile = (req:Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  // @ts-ignore
  const { _id } = req.user;
  return User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true },
  )
    .then((profile) => {
      if (!profile) throw new NotFoundError('Такого пользователя не существует');
      res.send({ data: profile });
    })
    .catch(next);
};

export const updateAvatar = (req:Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  // @ts-ignore
  const { _id } = req.user;
  return User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true },
  )
    .then((user) => {
      if (!user) throw new NotFoundError('Такого пользователя не существует');
      res.send({ data: user });
    })
    .catch(next);
};
