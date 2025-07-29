import { Board, BoardMember } from '@/models';
import { NextFunction, Request, Response } from 'express';

export const getAllBoards = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const boards = await Board.findAll();
    if (!boards) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'No boards found' });
    }
    res.status(200).json({ message: 'Fetched all boards', data: boards });
  } catch (error) {
    next(error);
  }
};

export const getBoardById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const board = await Board.findByPk(id);
    if (!board) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Board not found' });
    }
    res
      .status(200)
      .json({ status: 'success', message: 'Fetched board', data: board });
  } catch (error) {
    next(error);
  }
};
export const createBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, background_image, created_by, is_private } =
    req.body;
  try {
    if (!title || !created_by) {
      return res.status(400).json({
        status: 'failed',
        message: 'Title and created_by are required',
      });
    }
    const existingBoard = await Board.findOne({ where: { title } });
    if (existingBoard) {
      return res.status(400).json({
        status: 'failed',
        message: 'Board with this title already exists',
      });
    }
    const newBoard = await Board.create({
      title,
      description,
      background_image,
      created_by,
      is_private,
    });
    res
      .status(201)
      .json({ status: 'success', message: 'Board created', data: newBoard });
  } catch (error) {
    next(error);
  }
};

export const updateBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { title, description, background_image, is_private } = req.body;
  try {
    const board = await Board.findByPk(id);
    if (!board) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Board not found' });
    }
    await board.update({
      title,
      description,
      background_image,
      is_private,
    });
    res
      .status(200)
      .json({ status: 'success', message: 'Board updated', data: board });
  } catch (error) {
    next(error);
  }
};

export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const board = await Board.findByPk(id);
    if (!board) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Board not found' });
    }
    await board.destroy();
    res.status(200).json({ status: 'success', message: 'Board deleted' });
  } catch (error) {
    next(error);
  }
};

export const inviteUserToBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: boardId } = req.params;
  const { userId } = req.body;
  try {
    const board = await Board.findByPk(boardId);
    if (!board) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Board not found' });
    }
    await Board.addUser?.(boardId, userId, 'member');
    res.status(200).json({
      status: 'success',
      message: 'User invited to board',
      data: { boardId, userId },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBoardMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: boardId } = req.params;
  try {
    const members = await BoardMember.findAll({ where: { board_id: boardId } });
    res.status(200).json({
      status: 'success',
      message: 'Fetched all board members',
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBoardMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { boardId, userId } = req.params;
    const boardMember = await BoardMember.findOne({
      where: {
        board_id: boardId,
        user_id: userId,
      },
    });
    if (!boardMember) {
      return res.status(404).json({
        status: 'failed',
        message: 'Board member not found',
      });
    }
    await boardMember.destroy();
  } catch (error) {
    next(error);
  }
};
