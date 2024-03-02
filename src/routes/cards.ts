import { Router } from 'express';
import cardController from '../controllers/cards';
import { cardFullSchema, cardIdSchema } from '../utils/celebrate-schemas/cards';

const cardRouter = Router();

cardRouter.get('/cards', cardController.getCards);
cardRouter.post('/cards', cardFullSchema, cardController.postCard);
cardRouter.delete('/cards/:cardId', cardIdSchema, cardController.deleteCard);
cardRouter.put('/cards/:cardId/likes', cardIdSchema, cardController.putLike);
cardRouter.delete('/cards/:cardId/likes', cardIdSchema, cardController.deleteLike);

export default cardRouter;
