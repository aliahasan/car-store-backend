import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import tryCatchAsync from '../../utils/tryCatchAsync';
import { orderService } from './order.services';

const handlePlaceOrder = tryCatchAsync(async (req, res) => {
  const { userId } = req.user;
  const orderData = req.body;
  const result = await orderService.placeOrder(userId, orderData, req.ip!);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Order placed successfully',
    data: result,
  });
});

const verifyPayment = tryCatchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order verified successfully',
    data: order,
  });
});

const handleGetAllUsersOrders = tryCatchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await orderService.getAllUsersOrders(userId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User orders fetched successfully',
    data: result,
  });
});

const handleCancelOrder = tryCatchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await orderService.cancelOrder(orderId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order cancelled successfully',
    data: result,
  });
});

export const orderController = {
  handlePlaceOrder,

  handleGetAllUsersOrders,
  verifyPayment,
  handleCancelOrder,
};
