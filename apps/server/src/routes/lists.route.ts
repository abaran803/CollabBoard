import { deleteList, updateList } from '@/controllers/lists.controller';
import express from 'express';

const router = express.Router();

router.put('/:id', updateList);
router.delete('/:id', deleteList);

export default router;
