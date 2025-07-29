import { List } from '@/models';
import { NextFunction, Request, Response } from 'express';

export const getAllLists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { boardId } = req.params;
    const lists = await List.findAll({
      where: {
        board_id: boardId,
      },
    });
    if (!lists) {
      return res.status(404).json({
        status: 'failed',
        message: 'No list found',
      });
    }
    res
      .status(200)
      .send({ status: 'success', message: 'Fetched all lists', data: lists });
  } catch (error) {
    next(error);
  }
};

export const createList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { boardId } = req.params;
    const { title } = req.body;
    const list = await List.create({ title, board_id: boardId });
    if (!list) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to create list',
      });
    }
    res.status(201).json({
      status: 'success',
      message: 'List created successfully',
      data: list,
    });
  } catch (error) {
    next(error);
  }
};

export const updateList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    if (!title) {
      return res.status(400).json({
        status: 'failed',
        message: 'Title is required',
      });
    }
    const list = await List.findByPk(id);
    if (!list) {
      return res.status(404).json({
        status: 'failed',
        message: 'List not found',
      });
    }
    list.title = title || list.title;
    await list.save();
    res.status(200).json({
      status: 'success',
      message: 'List updated successfully',
      data: list,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const list = await List.findByPk(id);
    if (!list) {
      return res.status(404).json({
        status: 'failed',
        message: 'List not found',
      });
    }
    await list.destroy();
    res.status(200).json({
      status: 'success',
      message: 'List deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
