import { Router } from 'express';
import cardController from '../controllers/cards';

const cardRouter = Router();

cardRouter.get('/cards', cardController.getCards);
cardRouter.post('/cards', cardController.postCard);
cardRouter.delete('/cards/:cardId', cardController.deleteCard);
cardRouter.put('/cards/:cardId/likes', cardController.putLike);
cardRouter.delete('/cards/:cardId/likes', cardController.deleteLike);

export default cardRouter;
