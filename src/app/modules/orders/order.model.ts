import mongoose, { Schema } from 'mongoose';
import { TOrder, TOrderModel } from './order.interface';

const orderSchema = new Schema<TOrder, TOrderModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: {
      type: String,
      required: true,
    },
    cars: [
      {
        car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'cancelled', 'failed'],
      default: 'pending',
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'completed'],
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'accepted', 'reject'],
      default: 'pending',
      required: true,
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  }
);
orderSchema.statics.isAuthenticated = async function (
  id: string
): Promise<boolean> {
  const user = await this.findOne({ user: id });
  return !!user;
};

// Create the model
const Order = mongoose.model<TOrder, TOrderModel>('Order', orderSchema);

export default Order;
