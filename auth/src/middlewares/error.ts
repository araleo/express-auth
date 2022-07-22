import { Request, Response, NextFunction } from 'express';

const errMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // TODO log errors
  res.status(500).json({ error: true, message: err.message });
};

export default errMiddleware;
