/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderService } from './order.services';
import { orderValidation } from './order.validation';

const handlePlaceOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    //  here passed the request body data to zod to validate
    const validateOrderInfo = orderValidation.parse(orderData);
    const result = await orderService.placeOrder(validateOrderInfo);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order placed successfully',
        data: result,
      });
    }
  } catch (error: any) {
    // here i tried to implement the zod error response
    res.status(500).json({
      success: false,
      message: 'Validation failed',
      error: error?.issues[0] || error.message,
    });
  }
};

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
};
