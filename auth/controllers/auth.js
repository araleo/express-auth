const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/config');
const User = require('../models/user');

const getJwt = (email, id, status) => {
  return jwt.sign(
    {
      email: email,
      userId: id,
      status: status,
    },
    jwtSecret,
    { expiresIn: '1h' }
  );
};

const getOneHourAhead = () => {
  return new Date(Date.now() + 60 * 60 * 1000);
};

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

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
      const expires = getOneHourAhead();
      res
        .status(201)
        .cookie('SESSIONID', token, {
          secure: true,
          expires: expires,
          httpOnly: true,
        })
        .json({
          message: 'User created',
          email: result.email,
          userId: result._id.toString(),
          tokenExpiresIn: expires,
        });
    })
    .catch((err) => next(err));
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, loadedUser.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
      }
      const token = getJwt(
        loadedUser.email,
        loadedUser._id.toString(),
        loadedUser.status
      );
      const expires = getOneHourAhead();
      res
        .status(200)
        .cookie('SESSIONID', token, {
          secure: true,
          expires: expires,
          httpOnly: true,
        })
        .json({
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
          tokenExpiresIn: expires,
        });
    })
    .catch((err) => next(err));
};
