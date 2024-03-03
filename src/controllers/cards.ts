import { NextFunction, Request, Response } from 'express';
import { QueryOptions, UpdateQuery } from 'mongoose';
import { HTTP_STATUS_CREATED } from '../utils/responseCodes';
import Card from '../models/card';

const cardDecorator = (req:Request, res: Response, next: NextFunction) => {
  const _id = req.params.cardId;

  return function updateCard(operation: UpdateQuery<any>, settings: QueryOptions) {
    return Card.findByIdAndUpdate(_id, operation, settings)
      .orFail()
      .populate(['likes', 'owner'])
      .then((card) => res.send({ data: card }))
      .catch(next);
  };
};

const cardController = {
  putLike: (req:Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const owner = req.user._id;
    return cardDecorator(req, res, next)({ $addToSet: { likes: owner } }, { new: true });
  },

  deleteLike: (req:Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const owner = req.user._id;
    return cardDecorator(req, res, next)({ $pull: { likes: owner } }, { new: true });
  },

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
      .then((card) => res.status(HTTP_STATUS_CREATED).send({ data: card }))
      .catch(next);
  },

  deleteCard: (req:Request, res: Response, next: NextFunction) => {
    const _id = req.params.cardId;

    return Card.findByIdAndDelete(_id)
      .orFail()
      .then((card) => res.send({ data: card }))
      .catch(next);
  },

};

export default cardController;
