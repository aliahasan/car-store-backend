import { Model } from 'mongoose';

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
