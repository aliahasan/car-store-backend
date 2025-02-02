import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { adminControllers } from './admin.controller';
import { adminValidations } from './admin.validation';

const router = Router();

router.get('/all-users', auth('admin'), adminControllers.handleGetAllUser);

router.get('/all-orders', auth('admin'), adminControllers.handleGetAllOrders);

router.patch(
  '/change-status',
  auth('admin'),
  validateRequest(adminValidations.updateUserSchema),
  adminControllers.handleUpdateUserStatus
);

router.patch(
  '/update-role',
  auth('admin'),
  validateRequest(adminValidations.updateRoleSchema),
  adminControllers.handleUpdateUserRole
);

router.patch(
  '/update-order-status',
  auth('admin'),
  validateRequest(adminValidations.updateOrderStatus),
  adminControllers.handleUpdateOrderStatus
);

router.patch(
  '/update-order-delivery-status/:orderId',
  auth('admin'),
  validateRequest(adminValidations.updateOrderDeliveryStatusSchema),
  adminControllers.handleUpdateDeliveryStatus
);

router.delete(
  '/delete-order/:orderId',
  auth('admin'),
  adminControllers.handleCancelOrder
);
export const adminRoute = router;
