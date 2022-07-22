import { Router } from 'express';
import { login, signup } from '../controllers/auth';
import {
  loginValidators,
  signupValidators,
  validateRequest,
} from '../middlewares/validators';

const router = Router();

router.post('/signup', signupValidators, validateRequest, signup);

router.post('/login', loginValidators, validateRequest, login);

export default router;
