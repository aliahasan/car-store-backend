import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { authControllers } from './auth.controller';
import { authValidations } from './auth.validation';

const router = Router();

router.get('/all-users', auth('admin'), authControllers.handleGetAllUser);
router.patch(
  '/change-status/:userId',
  auth('admin'),
  validateRequest(authValidations.updateUserSchema),
  authControllers.handleUpdateUserStatus
);
router.patch(
  '/update-role/:userId',
  auth('admin'),
  validateRequest(authValidations.updateRoleSchema),
  authControllers.handleUpdateUserRole
);

router.patch(
  '/update-order-status/:orderId',
  auth('admin'),
  validateRequest(authValidations.updateOrderSchema),
  authControllers.handleUpdateOrderStatus
);
export const authRoutes = router;
