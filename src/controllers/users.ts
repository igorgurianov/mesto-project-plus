import { Request, Response } from 'express';
import User from '../models/user';

export const createUser = (req:Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Получите ошибку' }));
};

export const getAllUsers = (req:Request, res: Response) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(() => res.status(500).send({ message: 'Получите ошибку' }));

export const getUserById = (req:Request, res: Response) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Получите ошибку getUserById' }));
};

export const updateProfile = (req:Request, res: Response) => {
  const { name, about } = req.body;
  // @ts-ignore
  const { _id } = req.user;
  return User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true },
  )
    .then((profile) => res.send({ data: profile }))
    .catch(() => res.status(500).send({ message: 'Получите ошибку updateProfile' }));
};

export const updateAvatar = (req:Request, res: Response) => {
  const { avatar } = req.body;
  // @ts-ignore
  const { _id } = req.user;
  return User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true },
  )
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Получите ошибку updateAvatar' }));
};
