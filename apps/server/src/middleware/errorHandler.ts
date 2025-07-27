import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  console.error(
    'Middleware Error Handling:',
    `Status - ${errStatus}, Message - ${errMsg}`,
  );
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
};

export default errorHandler;
