import { Types } from 'mongoose';

export type TOrder = {
  user: Types.ObjectId;
  cars: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  transactionId: string;
};
export type orderPayload = TOrder['cars'];
