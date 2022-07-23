import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import { RequestHandler } from 'express';
import { getCookieCfg, getJwt } from '../utils/lib';
import { jwtConfig } from '../config/config';

export const signup: RequestHandler = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const pwd = req.body.password;

  bcrypt
    .hash(pwd, 12)
    .then((password) => {
      const user = new User({ name, email, password });
      return user.save();
    })
    .then((result) => {
      const { email, _id, status } = result;
      const token = getJwt(email, _id.toString(), status, jwtConfig.jwtSecret);
      if (token === undefined) {
        throw new Error();
      }
      const data = { userId: result._id.toString() };
      res.status(201).cookie('SESSIONID', token, getCookieCfg()).json(data);
    })
    .catch((err) => next(err));
};

export const login: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if (user === null) {
    return res.status(401).json({ errors: ['Invalid credentials'] });
  }

  bcrypt
    .compare(password, user.password)
    .then((isEqual) => {
      if (!isEqual) {
        return res.status(401).json({ errors: ['Invalid credentials'] });
      }
      const { email, _id, status } = user;
      const token = getJwt(email, _id.toString(), status, jwtConfig.jwtSecret);
      if (token === undefined) {
        throw new Error();
      }
      res
        .status(200)
        .cookie('SESSIONID', token, getCookieCfg())
        .json({ userId: user._id.toString() });
    })
    .catch((err) => next(err));
};
