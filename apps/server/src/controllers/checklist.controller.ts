import { Checklist } from '@/models/Checklist.model';
import { NextFunction, Request, Response } from 'express';

export const getChecklistOnCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  try {
    if (!cardId) {
      return res.status(400).json({ message: 'Card ID is required.' });
    }
    const checklist = await Checklist.findAll({
      where: { cardId },
    });
    res.status(200).json({
      status: 'success',
      message: 'Checklist retrieved successfully',
      data: checklist,
    });
  } catch (error) {
    next(error);
  }
};

export const createChecklistOnCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const { title } = req.body;
  try {
    if (!cardId || !title) {
      return res
        .status(400)
        .json({ message: 'Card ID and title are required.' });
    }
    const checklist = await Checklist.create({
      cardId,
      title,
    });
    if (!checklist) {
      return res.status(500).json({ message: 'Failed to create checklist.' });
    }
    res.status(201).json({
      status: 'success',
      message: 'Checklist created successfully',
      data: checklist,
    });
  } catch (error) {
    next(error);
  }
};

export const updateChecklist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: checklistId } = req.params;
  const { title } = req.body;
  try {
    if (!checklistId || !title) {
      return res
        .status(400)
        .json({ message: 'Checklist ID and title are required.' });
    }
    const checklist = await Checklist.findByPk(checklistId);
    if (!checklist) {
      return res.status(404).json({ message: 'Checklist not found.' });
    }
    checklist.title = title;
    await checklist.save();
    res.status(200).json({
      status: 'success',
      message: 'Checklist updated successfully',
      data: checklist,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteChecklist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: checklistId } = req.params;
  try {
    if (!checklistId) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Checklist ID is required.' });
    }
    const checklist = await Checklist.findByPk(checklistId);
    if (!checklist) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Checklist not found.' });
    }
    await checklist.destroy();
    res.status(200).json({
      status: 'success',
      message: 'Checklist deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
