import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@/models/Users.model';
import { Profile as FacebookProfile } from 'passport-facebook';
import { Profile as GoogleProfile } from 'passport-google-oauth20';

// Email Registration
export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered.' });
  }
  await User.create({ firstName, lastName, email, password });
  res.status(201).json({ message: 'User registered successfully.' });
};

// Email Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' },
  );
  res.json({ token });
};

// Google Callback
export const googleCallback = async (req: Request, res: Response) => {
  const profile = req.user as GoogleProfile & {
    accessToken: string;
    refreshToken: string;
  };
  const email = profile.emails?.[0]?.value as string;
  let user = await User.findOne({ where: { googleId: profile.id } });

  if (!user) {
    user = await User.findOne({ where: { email } });
    if (user) {
      user.googleId = profile.id;
      user.googleTokens = {
        accessToken: profile.accessToken,
        refreshToken: profile.refreshToken,
      };
      await user.save();
    } else {
      user = await User.create({
        firstName: profile.displayName.split(' ')[0],
        lastName: profile.displayName.split(' ')[1] || '',
        email,
        googleId: profile.id,
        googleTokens: {
          accessToken: profile.accessToken,
          refreshToken: profile.refreshToken,
        },
      });
    }
  } else {
    user.googleTokens = {
      accessToken: profile.accessToken,
      refreshToken: profile.refreshToken,
    };
    await user.save();
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' },
  );
  res.redirect(`${process.env.FRONTEND_URL}/dashboard/token?token=${token}`);
};

// Facebook Callback
export const facebookCallback = async (req: Request, res: Response) => {
  const profile = req.user as FacebookProfile & {
    accessToken: string;
    refreshToken: string;
  };
  const email = profile.emails?.[0]?.value as string;
  let user = await User.findOne({ where: { facebookId: profile.id } });

  if (!user) {
    user = await User.findOne({ where: { email } });
    if (user) {
      user.facebookId = profile.id;
      user.facebookTokens = {
        accessToken: profile.accessToken,
        refreshToken: profile.refreshToken,
      };
      await user.save();
    } else {
      user = await User.create({
        firstName: profile.displayName?.split(' ')[0] || '',
        lastName: profile.displayName?.split(' ')[1] || '',
        email,
        facebookId: profile.id,
        facebookTokens: {
          accessToken: profile.accessToken,
          refreshToken: profile.refreshToken,
        },
      });
    }
  } else {
    user.facebookTokens = {
      accessToken: profile.accessToken,
      refreshToken: profile.refreshToken,
    };
    await user.save();
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' },
  );
  res.redirect(`${process.env.FRONTEND_URL}/dashboard/token?token=${token}`);
};
