import mongoose, { Schema } from 'mongoose';
import { TOrder, TOrderModel } from './order.interface';

const orderSchema = new Schema<TOrder, TOrderModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      required: true,
      default: 'Pending',
    },
    transactionId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

orderSchema.statics.isAuthenticated = async function (
  id: string
): Promise<boolean> {
  const user = await this.findById({ user: id });
  return !!user;
};

// Create the model
const Order = mongoose.model<TOrder, TOrderModel>('Order', orderSchema);

export default Order;
