import { Label } from '@/models';
import { NextFunction, Request, Response } from 'express';

export const getLabelsByBoardId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { boardId } = req.params;
  try {
    if (!boardId) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Board ID is required' });
    }
    const labels = await Label.findAll({ where: { board_id: boardId } });
    if (!labels) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'No labels found for this board' });
    }
    res.status(200).json({ status: 'success', data: labels });
  } catch (error) {
    next(error);
  }
};

export const createLabel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { boardId } = req.params;
  const { name, color } = req.body;
  try {
    if (!boardId || !name || !color) {
      return res.status(400).json({
        status: 'failed',
        message: 'Board ID, name, and color are required',
      });
    }
    const newLabel = await Label.create({ board_id: boardId, name, color });
    res.status(201).json({ status: 'success', data: newLabel });
  } catch (error) {
    next(error);
  }
};

export const updateLabel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { name, color } = req.body;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Label ID is required' });
    }
    if (!name && !color) {
      return res.status(400).json({
        status: 'failed',
        message: 'At least one of name or color must be provided',
      });
    }
    const label = await Label.findByPk(id);
    if (!label) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Label not found' });
    }
    label.name = name || label.name;
    label.color = color || label.color;
    await label.save();
    res.status(200).json({ status: 'success', data: label });
  } catch (error) {
    next(error);
  }
};

export const deleteLabel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Label ID is required' });
    }
    const label = await Label.findByPk(id);
    if (!label) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Label not found' });
    }
    await label.destroy();
    res.status(200).json({ status: 'success', message: 'Label deleted' });
  } catch (error) {
    next(error);
  }
};

export const attachLabelToCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId, labelId } = req.params;
  try {
    if (!cardId || !labelId) {
      return res.status(400).json({
        status: 'failed',
        message: 'Card ID and Label ID are required',
      });
    }
    const label = await Label.findByPk(labelId);
    if (!label) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Label not found' });
    }
    await Label.attachToCard(cardId, labelId);
    res.status(200).json({
      status: 'success',
      message: 'Label attached to card',
      data: { cardId, labelId },
    });
  } catch (error) {
    next(error);
  }
};

export const detachLabelFromCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId, labelId } = req.params;
  try {
    if (!cardId || !labelId) {
      return res.status(400).json({
        status: 'failed',
        message: 'Card ID and Label ID are required',
      });
    }
    const label = await Label.findByPk(labelId);
    if (!label) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Label not found' });
    }
    await Label.detachFromCard(cardId, labelId);
    res.status(200).json({
      status: 'success',
      message: 'Label detached from card',
      data: { cardId, labelId },
    });
  } catch (error) {
    next(error);
  }
};
