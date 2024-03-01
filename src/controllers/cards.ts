import { Request, Response } from 'express';
import Card from '../models/card';

const cardController = {

  getCards: (req:Request, res: Response) => Card.find({})
    .populate('owner')
    .then((card: any) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Получите ошибку' })),

  postCard: (req:Request, res: Response) => {
    const { name, link } = req.body;
    // @ts-ignore
    const owner = req.user._id;

    return Card.create({ name, owner, link })
      .then((card) => res.send({ data: card }))
      .catch(() => res.status(500).send({ message: 'Получите ошибку' }));
  },

  deleteCard: (req:Request, res: Response) => {
    const _id = req.params.cardId;

    return Card.findByIdAndDelete({ _id })
      .then((card) => res.send({ data: card }))
      .catch(() => res.status(500).send({ message: 'Получите ошибку' }));
  },

  putLike: (req:Request, res: Response) => {
    const _id = req.params.cardId;
    // @ts-ignore
    const owner = req.user._id;

    return Card.findByIdAndUpdate(_id, { $addToSet: { likes: owner } }, { new: true })
      .populate(['likes', 'owner'])
      .then((card) => res.send({ data: card }))
      .catch(() => res.status(500).send({ message: 'Получите ошибку' }));
  },

  deleteLike: (req:Request, res: Response) => {
    const _id = req.params.cardId;
    // @ts-ignore
    const owner = req.user._id;

    return Card.findByIdAndUpdate(_id, { $pull: { likes: owner } }, { new: true })
      .then((card) => res.send({ data: card }))
      .catch(() => res.status(500).send({ message: 'Получите ошибку' }));
  },

};

export default cardController;
