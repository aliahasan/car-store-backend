import express from 'express';
import { orderController } from './order.controller';
const router = express.Router();

router.post('/', orderController.handlePlaceOrder);
router.get('/revenue', orderController.handleTotalRevenue);
export const orderRoute = router;
