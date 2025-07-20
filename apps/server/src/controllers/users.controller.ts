import jwt from 'jsonwebtoken';
import { User, UserAttributes } from '@/models/Users.model';
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Please Provide All Fields',
      });
    }
    const isUserExist = await User.findOne({
      where: {
        email,
      },
    });
    if (isUserExist) {
      return res.status(409).send({
        success: false,
        message: 'Email already registered, please login',
      });
    }
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.status(201).send({
      success: true,
      message: 'Registered successfully',
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error In Register API',
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Please provide email and password',
      });
    }
    const user: UserAttributes | null = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Credentials',
      });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).send({
        success: false,
        message: 'JWT_SECRET is not defined in environment variables',
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(200).send({
      success: true,
      message: 'Login Successfully',
      token,
      user,
    });
  } catch (err) {
    console.log('Login Error:', err);
    res.status(500).send({
      success: false,
      message: 'Error In Login API',
      error: err,
    });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: 'Please provide new and old password',
      });
    }
    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: 'Invalid Old Password',
      });
    }
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: 'Password updated',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in password update api',
      error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    await user.destroy();
    return res.status(200).send({
      success: true,
      message: 'Your account has been deleted',
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Error in user delete profile',
      error,
    });
  }
};
