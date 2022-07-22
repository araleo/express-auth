import { RequestHandler } from 'express';

const notFoundMiddleware: RequestHandler = (_req, res, _next) => {
  res.status(404).json({});
};

export default notFoundMiddleware;
