import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

// Middleware to hash password before saving user
const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Hash password only if it's not already hashed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    req.body.password = hashedPassword;
    next();
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

export default hashPassword;
