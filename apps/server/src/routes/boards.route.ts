import express from 'express';
import {
  createBoard,
  deleteBoard,
  deleteBoardMember,
  getAllBoardMember,
  getAllBoards,
  getBoardById,
  inviteUserToBoard,
  updateBoard,
} from '@/controllers/boards.controller';
import { createList, getAllLists } from '@/controllers/lists.controller';

const router = express.Router();

router.get('/', getAllBoards);
router.get('/:id', getBoardById);
router.post('/', createBoard);
router.put('/:id', updateBoard);
router.delete('/:id', deleteBoard);
router.post('/:id/invite', inviteUserToBoard);
router.get('/:id/:members', getAllBoardMember);
router.delete('/:boardId/members/:userId', deleteBoardMember);
router.get('/:boardId/lists', getAllLists);
router.post('/:boardId/lists', createList);

export default router;
