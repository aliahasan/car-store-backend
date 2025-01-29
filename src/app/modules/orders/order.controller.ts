/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
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

const handleTotalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.calculateTotalRevenue();
    res.status(200).json({
      success: true,
      message: ' Revenue calculated successfully',
      data: {
        totalRevenue,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: 'Failed to calculate total revenue',
    });
  }
};

export const orderController = {
  handlePlaceOrder,
  handleTotalRevenue,
  handleGetAllUsersOrders,
  verifyPayment,
  handleCancelOrder,
};
