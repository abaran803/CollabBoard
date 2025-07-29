import { Card } from '@/models';
import { NextFunction, Request, Response } from 'express';

export const getAllCards = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { listId } = req.params;
  try {
    if (!listId) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'List ID is required' });
    }
    const cards = await Card.findAll({
      where: { list_id: listId },
    });
    if (!cards) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'No cards found' });
    }
    res
      .status(200)
      .json({ status: 'success', message: 'Fetched all cards', data: cards });
  } catch (error) {
    next(error);
  }
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { listId } = req.params;
  const { title, description, created_by } = req.body;
  try {
    if (!title || !listId) {
      return res.status(400).json({
        status: 'failed',
        message: 'Title and list ID are required',
      });
    }
    const existingCard = await Card.findOne({
      where: { title, list_id: listId },
    });
    if (existingCard) {
      return res.status(400).json({
        status: 'failed',
        message: 'Card with this title already exists in this list',
      });
    }
    if (!created_by) {
      return res.status(400).json({
        status: 'failed',
        message: 'Created by user ID is required',
      });
    }
    const card = await Card.create({
      title,
      description,
      list_id: listId,
      created_by,
    });
    res
      .status(201)
      .json({ status: 'success', message: 'Card created', data: card });
  } catch (error) {
    next(error);
  }
};

export const getCardById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const card = await Card.findByPk(id);
    if (!card) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Card not found' });
    }
    res
      .status(200)
      .json({ status: 'success', message: 'Fetched card', data: card });
  } catch (error) {
    next(error);
  }
};

export const updateCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { title, description, due_date } = req.body;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Card ID is required' });
    }
    if (!title && !description) {
      return res.status(400).json({
        status: 'failed',
        message: 'At least one field (title, description) is required',
      });
    }
    const card = await Card.findByPk(id);
    if (!card) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Card not found' });
    }
    if (title) card.title = title;
    if (description) card.description = description;
    if (due_date) card.due_date = due_date;
    await card.save();
    res
      .status(200)
      .json({ status: 'success', message: 'Card updated', data: card });
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Card ID is required' });
    }
    const card = await Card.findByPk(id);
    if (!card) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Card not found' });
    }
    await card.destroy();
    res.status(200).json({ status: 'success', message: 'Card deleted' });
  } catch (error) {
    next(error);
  }
};

export const moveCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { newListId, newPosition } = req.body;
  try {
    if (!id) {
      return res.status(400).json({
        status: 'failed',
        message: 'Card ID is required',
      });
    }
    if (!newListId || newPosition === undefined) {
      return res.status(400).json({
        status: 'failed',
        message: 'New list ID and position are required',
      });
    }
    const card = await Card.findByPk(id);
    if (!card) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Card not found' });
    }
    if (newListId) card.list_id = newListId;
    if (newPosition !== undefined) card.position = newPosition;
    await card.save();
    res
      .status(200)
      .json({ status: 'success', message: 'Card moved', data: card });
  } catch (error) {
    next(error);
  }
};
