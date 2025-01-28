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
  cars: {
    car: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
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
