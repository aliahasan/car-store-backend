import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import User from './user.model';
import { generateToken } from './user.utils';

const createUser = async (userData: TUser) => {
  const user = new User(userData);
  const result = await user.save();
  return result;
};

type Payload = Pick<TUser, 'email' | 'password'>;
const loginUser = async (payload: Payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'User not found. before login you must register an account'
    );
  }
  const checkedPassword = await User.isPasswordMatch(
    payload.password,
    user?.password
  );
  if (!checkedPassword) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }
  const jwtPayload = {
    role: user?.role,
    userId: user?._id,
    email: user?.email,
  };
  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  return {
    token: accessToken,
  };
};

const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 0,
  });
};

export const userServices = {
  createUser,
  loginUser,
  logoutUser,
};
