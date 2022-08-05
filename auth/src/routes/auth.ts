import { Router } from 'express';
import { login, signup, verify } from '../controllers/auth';
import {
  loginValidators,
  signupValidators,
  validateRequest,
} from '../middlewares/validators';

const router = Router();

router.post('/signup', signupValidators, validateRequest, signup);

router.post('/login', loginValidators, validateRequest, login);

router.post('/verify', verify);

export default router;
