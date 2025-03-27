import { StatusCodes } from 'http-status-codes';
import AppError from '../../../errors/AppError';
import Order from '../../orders/order.model';
import User from '../../user/user.model';

const getUserMetaData = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const orderStats = await Order.aggregate([
    {
      $match: { user: user._id },
    },
    {
      $group: {
        _id: '$orderStatus',
        totalOrders: { $sum: 1 },
        totalCost: { $sum: '$totalPrice' },
      },
    },
  ]);

  const result = {
    totalOrders: orderStats.reduce((acc, curr) => acc + curr.totalOrders, 0),
    totalCost: orderStats.reduce((acc, curr) => acc + curr.totalCost, 0),
    orderInfo: orderStats.map((status) => ({
      status: status?._id,
      total: status?.totalOrders,
    })),
  };
  return result;
};
export const userMetaServices = {
  getUserMetaData,
};
