import {
  deleteCard,
  getCardById,
  moveCard,
  updateCard,
} from '@/controllers/cards.controller';
import {
  attachLabelToCard,
  detachLabelFromCard,
} from '@/controllers/labels.controller';
import express from 'express';

const router = express.Router();

router.get('/:id', getCardById);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);
router.post('/:id/move', moveCard);
router.post('/:cardId/labels/:labelId', attachLabelToCard);
router.delete('/:cardId/labels/:labelId', detachLabelFromCard);

export default router;
