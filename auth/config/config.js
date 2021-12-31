module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  mongoIp: process.env.MONGO_AUTH_IP || 'mongo',
  mongoPort: process.env.MONGO_AUTH_PORT || 27017,
  mongoUser: process.env.MONGO_AUTH_USER,
  mongoPass: process.env.MONGO_AUTH_PASS,
  mongoDb: process.env.MONGO_AUTH_DB,
};
