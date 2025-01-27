import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userControllers } from './user.controller';
import { userValidations } from './user.validation';

const router = Router();
router.post(
  '/register',
  validateRequest(userValidations.registerValidationSchema),
  userControllers.handleRegisterUser
);

router.post(
  '/login',
  validateRequest(userValidations.loginValidationSchema),
  userControllers.handleLoginUser
);
router.post('/logout', userControllers.handleLogOutUser);

export const userRoutes = router;
