import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import tryCatchAsync from '../../utils/tryCatchAsync';
import { authServices } from './admin.service';

const handleGetAllUser = tryCatchAsync(async (req, res) => {
  const result = await authServices.getAllUsers();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const handleUpdateUserStatus = tryCatchAsync(async (req, res) => {
  const updatedUserInfo = req.body;
  const result = await authServices.changeStatus(updatedUserInfo);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User status updated successfully',
    data: result,
  });
});

const handleUpdateUserRole = tryCatchAsync(async (req, res) => {
  const userId = req.params.userId;
  const updatedUserInfo = req.body;
  const result = await authServices.changeRole(userId, updatedUserInfo);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User Role updated successfully',
    data: result,
  });
});

const handleGetAllOrders = tryCatchAsync(async (req, res) => {
  const result = await authServices.getAllOrders();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const handleUpdateDeliveryStatus = tryCatchAsync(async (req, res) => {
  const { orderId } = req.params;
  const updatedOrderInfo = req.body;
  const result = await authServices.updateOrderDeliveryStatus(
    orderId,
    updatedOrderInfo
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order status updated successfully',
    data: result,
  });
});

const handleUpdateOrderStatus = tryCatchAsync(async (req, res) => {
  const updatedOrderInfo = req.body;
  const result = await authServices.updateOrderStatus(updatedOrderInfo);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order status updated successfully',
    data: result,
  });
});

const handleCancelOrder = tryCatchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await authServices.cancelOrderByAdmin(orderId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order cancelled successfully',
    data: result,
  });
});

export const adminControllers = {
  handleGetAllUser,
  handleGetAllOrders,
  handleUpdateUserRole,
  handleUpdateUserStatus,
  handleUpdateOrderStatus,
  handleUpdateDeliveryStatus,
  handleCancelOrder,
};
