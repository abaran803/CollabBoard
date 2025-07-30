import { Comment } from '@/models';
import { NextFunction, Request, Response } from 'express';

export const getAllCommentsOnCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  try {
    if (!cardId) {
      return res.status(400).json({ message: 'Card ID is required.' });
    }
    const card = await Comment.findOne({ where: { id: cardId } });
    if (!card) {
      return res.status(404).json({ message: 'Card not found.' });
    }
    const comments = await Comment.findAll({
      where: { card_id: cardId },
    });
    if (!comments) {
      return res
        .status(404)
        .json({ message: 'No comments found for this card.' });
    }
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const createCommentOnCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const { content, id } = req.body;
  try {
    if (!cardId || !content) {
      return res
        .status(400)
        .json({ message: 'Card ID and content are required.' });
    }
    const comment = await Comment.create({
      card_id: cardId,
      content,
      user_id: id,
    });
    if (!comment) {
      return res.status(500).json({ message: 'Failed to create comment.' });
    }
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: commentId } = req.params;
  const { content } = req.body;
  try {
    if (!commentId || !content) {
      return res
        .status(400)
        .json({ message: 'Comment ID and content are required.' });
    }
    const comment = await Comment.findOne({
      where: { id: commentId },
    });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }
    comment.content = content;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: commentId } = req.params;
  try {
    if (!commentId) {
      return res.status(400).json({ message: 'Comment ID is required.' });
    }
    const comment = await Comment.findOne({
      where: { id: commentId },
    });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }
    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
