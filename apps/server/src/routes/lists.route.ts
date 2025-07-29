import { createCard, getAllCards } from '@/controllers/cards.controller';
import { deleteList, updateList } from '@/controllers/lists.controller';
import express from 'express';

const router = express.Router();

router.put('/:id', updateList);
router.delete('/:id', deleteList);
router.get('/:listId/cards', getAllCards);
router.post('/:listId/cards', createCard);

export default router;
