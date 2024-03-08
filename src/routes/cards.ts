import { Router } from 'express';
import cardController from '../controllers/cards';
import { cardFullSchema, cardIdSchema } from '../utils/celebrate-schemas/cards';

const router = Router();

router.get('/', cardController.getCards);
router.post('/', cardFullSchema, cardController.postCard);
router.delete('/:cardId', cardController.deleteCard);
router.put('/:cardId/likes', cardIdSchema, cardController.putLike);
router.delete('/:cardId/likes', cardIdSchema, cardController.deleteLike);

export default router;
