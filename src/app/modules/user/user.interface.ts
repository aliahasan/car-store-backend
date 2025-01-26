import { Model } from 'mongoose';
import { user_role } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  address: string;
  city: string;
};

export interface UserModel extends Model<TUser> {
  isPasswordMatch(
    userPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isUserExist(_id: string): Promise<TUser>;
}

export type TUserRole = keyof typeof user_role;
