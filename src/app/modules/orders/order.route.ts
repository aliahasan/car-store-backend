import express from 'express';
import auth from '../../middlewares/auth';
import { orderController } from './order.controller';
const router = express.Router();

router.post('/create-order', auth('admin'), orderController.handlePlaceOrder);
router.get('/revenue', orderController.handleTotalRevenue);
export const orderRoutes = router;
