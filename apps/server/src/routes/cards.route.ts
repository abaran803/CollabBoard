import {
  assignUserToCard,
  removeUserFromCard,
} from '@/controllers/cardmembers.model';
import {
  deleteCard,
  getCardById,
  moveCard,
  updateCard,
} from '@/controllers/cards.controller';
import {
  createChecklistOnCard,
  getChecklistOnCard,
} from '@/controllers/checklist.controller';
import {
  createCommentOnCard,
  getAllCommentsOnCard,
} from '@/controllers/comments.controller';
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

router.get('/:cardId/comments', getAllCommentsOnCard);
router.post('/:cardId/comments', createCommentOnCard);

router.get('/:cardId/checklists', getChecklistOnCard);
router.post('/:cardId/checklists', createChecklistOnCard);

router.post('/:cardId/members/:userId', assignUserToCard);
router.delete('/:cardId/members/:userId', removeUserFromCard);

export default router;
