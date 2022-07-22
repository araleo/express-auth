export const corsConfig = {
  origin: process.env.CORS_ORIGIN,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export const jwtConfig = {
  jwtSecret: process.env.JWT_SECRET,
};
