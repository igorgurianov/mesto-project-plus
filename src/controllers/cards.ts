import { NextFunction, Request, Response } from 'express';
import { QueryOptions, UpdateQuery } from 'mongoose';
import { HTTP_STATUS_CREATED } from '../utils/responseCodes';
import Card from '../models/card';

export interface IAuthRequest extends Request {
  user?: {
    _id: string
  }
}

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
  putLike: (req:IAuthRequest, res: Response, next: NextFunction) => {
    const owner = req.user?._id;
    return cardDecorator(req, res, next)({ $addToSet: { likes: owner } }, { new: true });
  },

  deleteLike: (req:IAuthRequest, res: Response, next: NextFunction) => {
    const owner = req.user?._id;
    return cardDecorator(req, res, next)({ $pull: { likes: owner } }, { new: true });
  },

  getCards: (req:Request, res: Response, next: NextFunction) => Card.find({})
    .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch(next),

  postCard: (req:IAuthRequest, res: Response, next: NextFunction) => {
    const { name, link } = req.body;
    const owner = req.user?._id;

    return Card.create({ name, owner, link })
      .then((card) => card.populate('owner'))
      .then((card) => res.status(HTTP_STATUS_CREATED).send({ data: card }))
      .catch(next);
  },

  deleteCard: async (req:IAuthRequest, res: Response, next: NextFunction) => {
    const _id = req.params.cardId;
    const userId = req.user?._id;
    const card = await Card.findById(_id).orFail();

    if (userId !== String(card.owner)) {
      return next(new Error('Можно удалять только свои карточки'));
    }

    return Card.findOneAndDelete({ _id })
      .orFail()
      .then((resCard) => res.send({ data: resCard }))
      .catch(next);
  },

};

export default cardController;
