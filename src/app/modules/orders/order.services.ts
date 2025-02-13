import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import Car from '../car/car.model';
import User from '../user/user.model';
import Order from './order.model';
import { orderUtils } from './order.utils';

const placeOrder = async (
  userId: string,
  payload: { cars: { car: string; quantity: number }[] },
  client_ip: string
) => {
  if (!payload.cars?.length) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Order is not specified');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (user.isBlocked) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Your account is blocked, you can not place any order'
    );
  }

  const cars = payload.cars;
  let totalPrice = 0;
  const carDetails = await Promise.all(
    cars.map(async (item) => {
      const car = await Car.findById(item.car);
      if (!car) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Car not found');
      }
      if (car.quantity < item.quantity || !car.isStock) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Car is out of stock');
      }
      const subtotal = car ? (car.price || 0) * item.quantity : 0;
      totalPrice += subtotal;
      return item;
    })
  );

  let order = await Order.create({
    user: userId,
    email: user?.email,
    cars: carDetails,
    totalPrice,
  });
  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    totalPrice: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.email,
    customer_phone: user.phone,
    customer_city: user.city,
    client_ip: client_ip,
  };
  const payment = await orderUtils.makePayment(shurjopayPayload);
  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }
  return payment.checkout_url;
};

// verifying the payment
const verifyPayment = async (order_id: string) => {
  const session = await Order.startSession();
  session.startTransaction();
  try {
    const verifyOrderPayment = await orderUtils.verifyPaymentAsync(order_id);
    if (verifyOrderPayment.length) {
      const bankStatus = verifyOrderPayment[0].bank_status;

      if (bankStatus === 'Cancel') {
        await Order.findOneAndDelete(
          { 'transaction.id': order_id },
          { session }
        );
      } else {
        // Update the order transaction details
        const updatedOrder = await Order.findOneAndUpdate(
          { 'transaction.id': order_id },
          {
            'transaction.bank_status': verifyOrderPayment[0].bank_status,
            'transaction.sp_code': verifyOrderPayment[0].sp_code,
            'transaction.sp_message': verifyOrderPayment[0].sp_message,
            'transaction.transactionStatus':
              verifyOrderPayment[0].transaction_status,
            'transaction.method': verifyOrderPayment[0].method,
            'transaction.date_time': verifyOrderPayment[0].date_time,
            paymentStatus:
              bankStatus === 'Success'
                ? 'paid'
                : bankStatus === 'Failed'
                  ? 'failed'
                  : bankStatus === 'Cancel'
                    ? 'cancelled'
                    : 'pending',
            deliveryStatus: bankStatus === 'Success' && 'pending',
            orderStatus: bankStatus === 'Success' && 'pending',
          },
          { new: true, session }
        );

        if (
          bankStatus === 'Success' &&
          updatedOrder?.paymentStatus === 'paid'
        ) {
          const carDetails = updatedOrder.cars;
          if (Array.isArray(carDetails)) {
            for (const car of carDetails) {
              const carId = car.car;
              const reduceQuantity = car.quantity;
              await Car.findByIdAndUpdate(
                carId,
                { $inc: { quantity: -reduceQuantity } },
                { new: true, session }
              );
            }
          }
        }
      }
    }
    await session.commitTransaction();
    return verifyOrderPayment;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

// calculate the total revenue by aggregation pipeline
const getAllUsersOrders = async (email: string) => {
  const result = await Order.find({ email: email }).populate(
    'cars.car',
    'name , images'
  );
  if (!result || result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No orders found');
  }
  return result;
};

const cancelOrder = async (orderId: string) => {
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }
  //accepted
  if (order.orderStatus === 'accepted') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Order already accepted ! you can not cancel it'
    );
  }
  await Order.deleteOne(order?._id);
  return 'Order deleted successfully';
};

export const orderService = {
  placeOrder,
  getAllUsersOrders,
  verifyPayment,
  cancelOrder,
};

//
// const calculateTotalRevenue = async () => {
//    try {
//      const result = await Order.aggregate([
//        {
//          $group: {
//            _id: null,
//            totalRevenue: { $sum: '$totalPrice' },
//          },
//        },
//        {
//          $project: {
//            _id: 0,
//            totalRevenue: 1,
//          },
//        },
//      ]);

//      return result[0]?.totalRevenue || 0;
//    } catch (error: any) {
//      throw new Error(error.message || 'Failed to calculate total revenue');
//    }
//  };
