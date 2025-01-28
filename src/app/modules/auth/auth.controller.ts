import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import tryCatchAsync from '../../utils/tryCatchAsync';
import { authServices } from './auth.service';

const handleGetAllUser = tryCatchAsync(async (req, res) => {
  const result = await authServices.getAllUsers();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const handleUpdateUserStatus = tryCatchAsync(async (req, res) => {
  const userId = req.params.userId;
  const updatedUserInfo = req.body;
  const result = await authServices.changeStatus(userId, updatedUserInfo);
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

const handleUpdateOrderStatus = tryCatchAsync(async (req, res) => {
  const { orderId } = req.params;
  const updatedOrderInfo = req.body;
  const result = await authServices.updateOrderStatus(
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

export const authControllers = {
  handleGetAllUser,
  handleUpdateUserRole,
  handleUpdateUserStatus,
  handleUpdateOrderStatus,
};
