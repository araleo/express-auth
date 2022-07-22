import jwt from 'jsonwebtoken';

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

export const getJwt = (
  email: string,
  id: string,
  status: string,
  secret: string | undefined
) => {
  if (!secret) {
    return;
  }
  return jwt.sign({ email, id, status }, secret, { expiresIn: '1h' });
};
