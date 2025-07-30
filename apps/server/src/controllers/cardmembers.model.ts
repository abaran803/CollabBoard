import { Card, CardMember, User } from '@/models';
import { NextFunction, Request, Response } from 'express';

export const assignUserToCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId, userId } = req.params;
  try {
    if (!cardId || !userId) {
      return res
        .status(400)
        .json({ message: 'Card ID and User ID are required.' });
    }
    const card = await Card.findByPk(cardId);
    if (!card) {
      return res.status(404).json({ message: 'Card not found.' });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    await CardMember.create({
      card_id: cardId,
      user_id: userId,
    });
    res.status(200).json({
      status: 'success',
      message: 'User assigned to card successfully',
      data: card,
    });
  } catch (error) {
    next(error);
  }
};

export const removeUserFromCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId, userId } = req.params;
  try {
    if (!cardId || !userId) {
      return res.status(400).json({
        status: 'failed',
        message: 'Card ID and User ID are required.',
      });
    }
    const cardMember = await CardMember.findOne({
      where: { card_id: cardId, user_id: userId },
    });
    if (!cardMember) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Card member not found.' });
    }
    await cardMember.destroy();
    res.status(200).json({
      status: 'success',
      message: 'User removed from card successfully',
    });
  } catch (error) {
    next(error);
  }
};
