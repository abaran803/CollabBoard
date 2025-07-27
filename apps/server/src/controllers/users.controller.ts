import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@/models/Users.model';
import bcrypt from 'bcryptjs';

// Email Registration
export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ firstName, lastName, email, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully.' });
};

// Email Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !user.password) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' },
  );
  res.json({ token });
};

// Update Password
export const updatePassword = async (req: Request, res: Response) => {
  const { userId, newPassword } = req.body; // or get from req.user if using JWT
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  res.json({ message: 'Password updated successfully.' });
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  await user.destroy();
  res.json({ message: 'User deleted successfully.' });
};

export const logout = (req: Request, res: Response) => {
  // Destroy session if exists (for social login)
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // If using cookies
      return res.json({ message: 'Logged out' });
    });
  } else {
    res.json({ message: 'Logged out' });
  }
};
