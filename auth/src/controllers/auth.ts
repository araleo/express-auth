import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/config';
import { User } from '../models/user';
import { RequestHandler } from 'express';
import { getOneHourAhead } from '../utils/lib';

const getJwt = (email: string, id: string, status: string) => {
  const secret = jwtConfig.jwtSecret;
  if (!secret) {
    return;
  }
  return jwt.sign({ email, id, status }, secret, { expiresIn: '1h' });
};

export const signup: RequestHandler = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedPw,
      });
      return user.save();
    })
    .then((result) => {
      const token = getJwt(result.email, result._id.toString(), result.status);
      res
        .status(201)
        .cookie('SESSIONID', token, {
          secure: true,
          expires: getOneHourAhead(),
          httpOnly: true,
        })
        .json({
          email: result.email,
          userId: result._id.toString(),
        });
    })
    .catch((err) => next(err));
};

export const login: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if (user === null) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  bcrypt
    .compare(password, user.password)
    .then((isEqual) => {
      if (!isEqual) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = getJwt(user.email, user._id.toString(), user.status);
      res
        .status(200)
        .cookie('SESSIONID', token, {
          secure: true,
          expires: getOneHourAhead(),
          httpOnly: true,
        })
        .json({
          email: user.email,
          userId: user._id.toString(),
        });
    })
    .catch((err) => next(err));
};
