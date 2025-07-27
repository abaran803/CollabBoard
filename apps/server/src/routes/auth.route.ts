import express from 'express';
import {
  deleteUser,
  login,
  logout,
  register,
  updatePassword,
} from '@/controllers/users.controller';
import { authUser } from '@/middleware/auth.middleware';
import passport from 'passport';
import {
  facebookCallback,
  googleCallback,
} from '@/controllers/auth.controller';

const router = express.Router();

router.post('/users/register', register);

router.post('/users/login', login);

router.put('/users/password/update', authUser, updatePassword);

router.delete('/users/:id', deleteUser);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleCallback,
);

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] }),
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  facebookCallback,
);

router.post('/logout', logout);

export default router;
