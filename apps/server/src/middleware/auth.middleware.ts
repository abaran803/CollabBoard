import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: 'Authorization header missing',
      });
    }
    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).send({
        success: false,
        message: 'JWT secret not configured',
      });
    }
    jwt.verify(
      token,
      jwtSecret,
      (
        err: jwt.VerifyErrors | null,
        decoded: string | jwt.JwtPayload | undefined,
      ) => {
        if (err) {
          return res.status(401).send({
            success: false,
            message: 'Un-Authorize User',
          });
        } else {
          if (
            typeof decoded === 'object' &&
            decoded !== null &&
            'id' in decoded
          ) {
            req.body.id = (decoded as jwt.JwtPayload).id;
          }
          next();
        }
      },
    );
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).send({
      success: false,
      message: 'Internal server error',
      error: error,
    });
  }
};
