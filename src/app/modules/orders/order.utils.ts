/* eslint-disable @typescript-eslint/no-explicit-any */
import ShurjoPay, { PaymentResponse, VerificationResponse } from 'shurjopay';
import config from '../../config';

const shurjopay = new ShurjoPay();
shurjopay.config(
  config.sp.sp_endpoint!,
  config.sp.sp_username!,
  config.sp.sp_password!,
  config.sp.sp_prefix!,
  config.sp.sp_return_url!
);

const makePayment = async (paymentPayload: any): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response) => resolve(response),
      (error) => reject(error)
    );
  });
};

const verifyPaymentAsync = async (
  order_id: string
): Promise<VerificationResponse[]> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response) => resolve(response),
      (error) => reject(error)
    );
  });
};

export const orderUtils = {
  makePayment,
  verifyPaymentAsync,
};

// const placeOrder = async (
//    userId: string,
//    payload: { cars: { car: string; quantity: number }[] }
//  ) => {
//    if (!payload.cars?.length) {
//      throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Order is not specified');
//    }
//    const user = await User.findById(userId);
//    if (!user) {
//      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
//    }
//    const cars = payload.cars;
//    const carIds = cars?.map((item) => item.car);

//    const carDetails = await Car.find({ _id: { $in: carIds } });
//    if (carDetails.length !== carIds.length) {
//      throw new AppError(StatusCodes.BAD_REQUEST, 'car is not found');
//    }

//    const totalPrice = cars.reduce((sum, item) => {
//      const car = carDetails.find((car) => car._id.toString() === item.car);
//      if (!car || car.quantity < item.quantity || !car.isStock) {
//        throw new AppError(
//          StatusCodes.BAD_REQUEST,
//          `Insufficient stock for ${car?.name}`
//        );
//      }
//      return sum + car.price * item.quantity;
//    }, 0);

//    try {
//      const paymentIntent = await stripe.paymentIntents.create({
//        amount: totalPrice * 100,
//        currency: 'usd',
//        automatic_payment_methods: {
//          enabled: true,
//        },
//      });
//      return {
//        userId,
//        totalPrice,
//        clientSecret: paymentIntent.client_secret!,
//        car: carIds,
//      };
//    } catch (error) {
//      throw new AppError(
//        StatusCodes.INTERNAL_SERVER_ERROR,
//        `Failed to create payment intent: ${(error as Error).message}`
//      );
//    }
//  };
