import { Router } from 'express';
import cardController from '../controllers/cards';
import { cardFullSchema, cardIdSchema } from '../utils/celebrate-schemas/cards';

const cardRouter = Router();

cardRouter.get('/', cardController.getCards);
cardRouter.post('/', cardFullSchema, cardController.postCard);
cardRouter.delete('/:cardId', cardController.deleteCard);
cardRouter.put('/:cardId/likes', cardIdSchema, cardController.putLike);
cardRouter.delete('/:cardId/likes', cardIdSchema, cardController.deleteLike);

export default cardRouter;
