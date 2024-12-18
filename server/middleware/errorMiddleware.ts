/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils';

const serverError = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.status) {
    return res.status(err.status).json({
      error: true,
      data: {
        status: err.status,
        message: err.message,
      },
    });
  }

  res.status(500).json({ error: true, data: { message: err.message } });
};
export default serverError;
