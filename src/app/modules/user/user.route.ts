import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userControllers } from './user.controller';
import { userValidations } from './user.validation';

const router = Router();

router.get('/get-me', auth('admin', 'user'), userControllers.handleGetMe);
router.post(
  '/register',
  validateRequest(userValidations.registerValidationSchema),
  userControllers.handleRegisterUser
);
router.patch(
  '/auth/update-password',
  auth('user', 'admin'),
  validateRequest(userValidations.changePasswordValidationSchema),
  userControllers.handleChangePassword
);

router.post(
  '/login',
  validateRequest(userValidations.loginValidationSchema),
  userControllers.handleLoginUser
);

router.put(
  '/update-myself',
  auth('user', 'admin'),
  validateRequest(userValidations.updateUserSchema),
  userControllers.handleUpdateUserInfo
);

router.post('/logout', userControllers.handleLogOutUser);

export const userRoutes = router;
