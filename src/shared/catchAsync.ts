import { NextFunction, Request, Response, RequestHandler } from 'express';

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // res.status(400).json({
      // success: false,
      // message: '🚫 Failed!',
      // })
      next(error);
    }
  };
};
export default catchAsync;
