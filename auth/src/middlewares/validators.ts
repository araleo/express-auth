import { RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';

export const emailValidator = body('email')
  .trim()
  .escape()
  .isEmail()
  .normalizeEmail()
  .withMessage('Invalid email')
  .custom(async (value, _) => {
    const user = await User.findOne({ email: value });
    if (user) {
      return Promise.reject('Invalid email');
    }
  });

export const signupPasswordValidator = body('password')
  .trim()
  .escape()
  .isStrongPassword()
  .withMessage('Invalid password');

export const loginPasswordValidator = body('password')
  .trim()
  .escape()
  .not()
  .isEmpty()
  .withMessage('Invalid password');

export const nameValidator = body('name')
  .trim()
  .escape()
  .not()
  .isEmpty()
  .withMessage('Invalid username');

export const signupValidators = [
  emailValidator,
  signupPasswordValidator,
  nameValidator,
];

export const loginValidators = [nameValidator, loginPasswordValidator];

export const validateRequest: RequestHandler = (req, res, next) => {
  const requestErrors = validationResult(req);
  if (!requestErrors.isEmpty()) {
    return res.status(400).json({ error: true, message: 'Bad request' });
  }
  next();
};
