exports.corsConfig = {
  origin: process.env.CORS_ORIGIN,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
