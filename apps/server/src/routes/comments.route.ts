import {
  deleteComment,
  updateComment,
} from '@/controllers/comments.controller';
import express from 'express';

const router = express.Router();

router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
