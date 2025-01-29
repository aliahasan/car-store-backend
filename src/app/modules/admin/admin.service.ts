import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TOrder } from '../orders/order.interface';
import Order from '../orders/order.model';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';

const getAllUsers = async () => {
  const users = await User.find();
  if (!users) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No users found');
  }
  return users;
};

const changeStatus = async (userId: string, payload: Partial<TUser>) => {
  const blockedUser = await User.findByIdAndUpdate(
    userId,
    {
      isBlocked: payload,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select('-password');
  if (!blockedUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return blockedUser;
};

const changeRole = async (userId: string, payload: Partial<TUser>) => {
  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
      role: payload,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select('-password');
  if (!updateUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return updateUser;
};

const updateOrderDeliveryStatus = async (
  orderId: string,
  payload: Partial<TOrder>
) => {
  const order = await Order.findByIdAndUpdate(orderId, {
    deliveryStatus: payload,
  });
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }
};

const cancelOrderByAdmin = async (orderId: string) => {
  const order = await Order.findByIdAndDelete(orderId);
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }
  return 'order deleted';
};

export const authServices = {
  changeStatus,
  changeRole,
  getAllUsers,
  updateOrderDeliveryStatus,
  cancelOrderByAdmin,
};
