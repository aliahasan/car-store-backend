import mongoose, { Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cars: {
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

// Create the model
const Order = mongoose.model<TOrder>('Order', orderSchema);

export default Order;
