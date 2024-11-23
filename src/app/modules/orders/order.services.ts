/* eslint-disable @typescript-eslint/no-explicit-any */
import { Car } from '../car/car.model';
import { TOrder } from './order.interface';
import Order from './order.model';

const placeOrder = async (orderInfo: TOrder) => {
  try {
    const { email, car, quantity, totalPrice } = orderInfo;

    const selectedCar = await Car.findById(car);
    if (!selectedCar) {
      throw new Error('Car not found. Please provide valid car information.');
    }

    // Ensure there is sufficient stock for the order
    if (!selectedCar.inStock || selectedCar.quantity < quantity) {
      throw new Error(`Insufficient stock. Car is not available anymore.`);
    }

    // Update car's inventory: reduce quantity and update stock status if necessary
    selectedCar.quantity -= quantity;
    if (selectedCar.quantity === 0) {
      selectedCar.inStock = false;
    }
    // Save the updated car inventory
    await selectedCar.save();

    // Create a new order in the Order collection
    const order = new Order({
      email: email,
      car: car,
      quantity: quantity,
      totalPrice: totalPrice,
    });

    // Save the new order to the database
    await order.save();
    return order;
  } catch (error: any) {
    throw new Error(error.message || 'something went wrong');
  }
};

// calculate the total revenue by aggregation pipeline

const calculateTotalRevenue = async () => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
        },
      },
    ]);

    return result[0]?.totalRevenue || 0;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to calculate total revenue');
  }
};

export const orderService = {
  placeOrder,
  calculateTotalRevenue,
};
