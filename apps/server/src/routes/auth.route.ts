import express from 'express';
import {
  deleteUser,
  login,
  register,
  updatePassword,
} from '@/controllers/users.controller';
import { authUser } from '@/middleware/auth.middleware';

const router = express.Router();

router.post('/users/register', register);

router.post('/users/login', login);

router.put('/users/password/update', authUser, updatePassword);

router.delete('/users/:id', deleteUser);

export default router;
