import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';
import tryCatchAsync from '../../utils/tryCatchAsync';
import { userServices } from './user.service';

const handleRegisterUser = tryCatchAsync(async (req, res) => {
  const data = req.body;
  const result = await userServices.createUser(data);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

const handleLoginUser = tryCatchAsync(async (req, res) => {
  const data = req.body;
  const result = await userServices.loginUser(data);
  const { token } = result;
  const bearerToken = `Bearer ${token}`;
  res.cookie('token', bearerToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User logged in successfully',
    data: token,
  });
});

export const userControllers = {
  handleRegisterUser,
  handleLoginUser,
};
