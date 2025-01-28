import express from 'express';
import auth from '../../middlewares/auth';
import { orderController } from './order.controller';
const router = express.Router();

router.get('/verify', auth('user'), orderController.verifyPayment);
router.post('/create-order', auth('user'), orderController.handlePlaceOrder);
router.get(
  '/get-my-orders',
  auth('user'),
  orderController.handleGetAllUsersOrders
);
export const orderRoutes = router;
