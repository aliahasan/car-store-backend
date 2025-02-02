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

const getAllOrders = async () => {
  const orders = await Order.find()
    .populate('user', 'email name')
    .populate('cars.car', 'name images');
  if (!orders) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No orders found');
  }
  return orders;
};

const changeStatus = async (payload: Record<string, unknown>) => {
  const user = await User.findById(payload?.userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  const blockedUser = await User.findByIdAndUpdate(
    payload?.userId,
    {
      isBlocked: payload.isBlocked,
    },
    {
      runValidators: true,
    }
  );

  return blockedUser;
};

const changeRole = async (userId: string, payload: Partial<TUser>) => {
  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
      role: payload.role,
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

const updateOrderStatus = async (payload: Record<string, unknown>) => {
  const order = await Order.findById(payload?.orderId);
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }
  if (order?.paymentStatus !== 'paid') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      `Payment is ${order?.paymentStatus}.you can not update status`
    );
  }
  const updateOrder = await Order.findByIdAndUpdate(
    payload?.orderId,
    {
      orderStatus: payload.orderStatus,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateOrder) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }
  return updateOrder;
};

const updateOrderDeliveryStatus = async (
  orderId: string,
  payload: Partial<TOrder>
) => {
  const order = await Order.findByIdAndUpdate(orderId, {
    deliveryStatus: payload.deliveryStatus,
  });
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }
  return order;
};

const cancelOrderByAdmin = async (orderId: string) => {
  const order = await Order.findByIdAndDelete(orderId, {
    runValidators: true,
  });
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }
  return 'order deleted';
};

export const authServices = {
  getAllUsers,
  getAllOrders,
  changeStatus,
  changeRole,
  updateOrderStatus,
  updateOrderDeliveryStatus,
  cancelOrderByAdmin,
};
