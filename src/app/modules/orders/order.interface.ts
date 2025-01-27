import { Model, Types } from 'mongoose';

export type TOrder = {
  user: Types.ObjectId;
  car: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  transactionId: string;
};

export interface TOrderModel extends Model<TOrder> {
  isAuthenticated(id: string): Promise<boolean>;
}
