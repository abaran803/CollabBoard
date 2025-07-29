import { deleteLabel, updateLabel } from '@/controllers/labels.controller';
import express from 'express';

const router = express.Router();

router.put('/:id', updateLabel);
router.delete('/:id', deleteLabel);

export default router;
