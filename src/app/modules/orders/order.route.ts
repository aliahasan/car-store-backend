import express from 'express';
import { orderController } from './order.controller';
const router = express.Router();

router.post('/', orderController.handlePlaceOrder);
router.post('/revenue', orderController.handleTotalRevenue);
export const orderRoute = router;
