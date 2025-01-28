import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { adminControllers } from './admin.controller';
import { adminValidations } from './admin.validation';

const router = Router();

router.get('/all-users', auth('admin'), adminControllers.handleGetAllUser);
router.patch(
  '/change-status/:userId',
  auth('admin'),
  validateRequest(adminValidations.updateUserSchema),
  adminControllers.handleUpdateUserStatus
);
router.patch(
  '/update-role/:userId',
  auth('admin'),
  validateRequest(adminValidations.updateRoleSchema),
  adminControllers.handleUpdateUserRole
);

router.patch(
  '/update-order-status/:orderId',
  auth('admin'),
  validateRequest(adminValidations.updateOrderSchema),
  adminControllers.handleUpdateOrderStatus
);
export const authRoutes = router;
