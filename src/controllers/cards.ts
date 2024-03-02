import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';

const NotFoundError = require('../errors/not-found-err');

const cardController = {

  getCards: (req:Request, res: Response, next: NextFunction) => Card.find({})
    .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch(next),

  postCard: (req:Request, res: Response, next: NextFunction) => {
    const { name, link } = req.body;
    // @ts-ignore
    const owner = req.user._id;

    return Card.create({ name, owner, link })
      .then((card) => card.populate('owner'))
      .then((card) => res.send({ data: card }))
      .catch(next);
  },

  deleteCard: (req:Request, res: Response, next: NextFunction) => {
    const _id = req.params.cardId;

    return Card.findByIdAndDelete({ _id })
      .then((card) => {
        if (!card) throw new NotFoundError('Такой карточки не существует');
        res.send({ data: card });
      })
      .catch(next);
  },

  putLike: (req:Request, res: Response, next: NextFunction) => {
    const _id = req.params.cardId;
    // @ts-ignore
    const owner = req.user._id;

    return Card.findByIdAndUpdate(_id, { $addToSet: { likes: owner } }, { new: true })
      .populate(['likes', 'owner'])
      .then((card) => {
        if (!card) throw new NotFoundError('Такой карточки не существует');
        res.send({ data: card });
      })
      .catch(next);
  },

  deleteLike: (req:Request, res: Response, next: NextFunction) => {
    const _id = req.params.cardId;
    // @ts-ignore
    const owner = req.user._id;

    return Card.findByIdAndUpdate(_id, { $pull: { likes: owner } }, { new: true })
      .then((card) => {
        if (!card) throw new NotFoundError('Такой карточки не существует');
        res.send({ data: card });
      })
      .catch(next);
  },

};

export default cardController;
