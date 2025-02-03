import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import { StringValue } from '../../global/types';
import { TUser } from './user.interface';
import User from './user.model';
import { generateToken } from './user.utils';

const createUser = async (userData: TUser) => {
  const { email } = userData;
  if (await User.findOne({ email })) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'user is already exist with this email'
    );
  }
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
    throw new AppError(StatusCodes.NOT_FOUND, 'Invalid credentials');
  }
  const jwtPayload = {
    role: user?.role,
    userId: user?._id,
    email: user?.email,
  };
  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as StringValue
  );
  return {
    token: accessToken,
  };
};

const changePassword = async (
  email: string,
  payload: { oldPassword: string; newPassword: string }
) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // Check if the provided old password matches the stored password
  const isMatch = await User.isPasswordMatch(
    payload.oldPassword,
    user.password
  );
  if (!isMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Password does not match');
  }

  // Hash the new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  );

  // Update the user's password and set the passwordChangedAt field
  await User.findOneAndUpdate(
    { _id: user._id },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
    { new: true }
  );

  return 'password changed successfully';
};

const getMeByEmail = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};

const updateMyself = async (email: string, payload: Partial<TUser>) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  const result = await User.findOneAndUpdate({ email: user.email }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
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
  changePassword,
  getMeByEmail,
  updateMyself,
};
