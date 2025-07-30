import {
  deleteChecklist,
  updateChecklist,
} from '@/controllers/checklist.controller';
import express from 'express';

const router = express.Router();

router.put('/:id', updateChecklist);
router.delete('/:id', deleteChecklist);

export default router;
