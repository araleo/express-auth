import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/config';

export const getOneHourAhead = () => {
  return new Date(Date.now() + 60 * 60 * 1000);
};

export const getCookieCfg = () => {
  return {
    secure: true,
    expires: getOneHourAhead(),
    httpOnly: true,
  };
};

export const getJwt = (email: string, id: string, status: string) => {
  const secret = jwtConfig.jwtSecret;
  if (!secret) {
    return;
  }
  return jwt.sign({ email, id, status }, secret, { expiresIn: '1h' });
};

export const verifyJwt = (token: string) => {
  const secret = jwtConfig.jwtSecret;
  if (!secret) {
    return;
  }
  try {
    jwt.verify(token, secret);
    return true;
  } catch (e) {
    return false;
  }
};
