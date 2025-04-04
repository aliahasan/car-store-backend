// import { Model, Types } from 'mongoose';

// export type TOrder = {
//   user: Types.ObjectId;
//   cars: {
//     car: Types.ObjectId;
//     quantity: number;
//   }[];
//   totalPrice: number;
//   status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
//   transactionId: string;
// };

import { Model, Types } from 'mongoose';

export type TOrder = {
  user: Types.ObjectId;
  email: string;
  cars: {
    car: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'cancelled' | 'failed';
  deliveryStatus: 'pending' | 'processing' | 'shipped' | 'completed';
  orderStatus: 'pending' | 'accepted' | 'reject';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
};
export interface TOrderModel extends Model<TOrder> {
  isAuthenticated(id: string): Promise<boolean>;
}
