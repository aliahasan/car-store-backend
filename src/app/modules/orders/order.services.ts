/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import stripe from '../../stripe/stripe.config';
import Car from '../car/car.model';
import Order from './order.model';

interface OrderPayload {
  car: string;
  quantity: number;
}
const placeOrder = async (userId: string, payload: OrderPayload) => {
  const car = await Car.findById(payload.car);
  if (!car) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Car not found. Please provide valid car information.'
    );
  }
  if (payload.quantity > car.quantity || !car.isStock) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Insufficient stock. Car is not available anymore.'
    );
  }

  const totalPrice = car.price * payload.quantity;
  if (totalPrice <= 0) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Invalid total price calculated.'
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return {
      userId,
      totalPrice,
      clientSecret: paymentIntent.client_secret!,
      car: car._id,
    };
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Failed to create payment intent: ${(error as Error).message}`
    );
  }
};

// calculate the total revenue by aggregation pipeline
const getAllUsersOrders = async (userId: string) => {
  const isAuthenticated = await Order.isAuthenticated(userId);
  if (!isAuthenticated) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are forbidden to access this recourse'
    );
  }
  const result = await Order.find({ user: userId });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No orders found');
  }
  return result;
};

const calculateTotalRevenue = async () => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
        },
      },
    ]);

    return result[0]?.totalRevenue || 0;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to calculate total revenue');
  }
};

export const orderService = {
  placeOrder,
  getAllUsersOrders,
  calculateTotalRevenue,
};
