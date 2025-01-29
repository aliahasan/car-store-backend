import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { orderController } from './order.controller';
import { orderValidations } from './order.validation';
const router = express.Router();

router.get('/verify', auth('user'), orderController.verifyPayment);
router.post(
  '/create-order',
  auth('user'),
  validateRequest(orderValidations.orderValidationSchema),
  orderController.handlePlaceOrder
);
router.get(
  '/get-my-orders',
  auth('user'),
  orderController.handleGetAllUsersOrders
);

router.delete(
  '/cancel-order/:orderId',
  auth('user'),
  orderController.handleCancelOrder
);

export const orderRoutes = router;
