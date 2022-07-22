export const corsConfig = {
  origin: process.env.CORS_ORIGIN,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export const jwtConfig = {
  jwtSecret: process.env.JWT_SECRET,
};

export const mongoConfig = {
  mongoIp: process.env.MONGO_AUTH_IP || 'mongo',
  mongoPort: process.env.MONGO_AUTH_PORT || 27017,
  mongoUser: process.env.MONGO_AUTH_USER,
  mongoPass: process.env.MONGO_AUTH_PASS,
  mongoDb: process.env.MONGO_AUTH_DB,
};
