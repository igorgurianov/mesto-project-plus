import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CREATED } from '../utils/responseCodes';
import Card from '../models/card';

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

  putLike: (req:Request, res: Response, next: NextFunction) => {
    const _id = req.params.cardId;
    // @ts-ignore
    const owner = req.user._id;

    return Card.findByIdAndUpdate(_id, { $addToSet: { likes: owner } }, { new: true })
      .orFail()
      .populate(['likes', 'owner'])
      .then((card) => res.send({ data: card }))
      .catch(next);
  },

  deleteLike: (req:Request, res: Response, next: NextFunction) => {
    const _id = req.params.cardId;
    // @ts-ignore
    const owner = req.user._id;

    return Card.findByIdAndUpdate(_id, { $pull: { likes: owner } }, { new: true })
      .orFail()
      .then((card) => res.send({ data: card }))
      .catch(next);
  },

};

export default cardController;
