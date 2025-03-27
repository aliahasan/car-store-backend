import Car from '../../../car/car.model';
import Order from '../../../orders/order.model';

const getAdminMetaData = async () => {
  const [orderStats, paymentStats, totalOrderCount, totalCars] =
    await Promise.all([
      Order.aggregate([
        {
          $group: {
            _id: '$orderStatus',
            totalOrders: { $sum: 1 },
          },
        },
      ]),

      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalPrice' },
          },
        },
      ]),
      Order.countDocuments(),
      Car.countDocuments(),
    ]);

  const totalRevenue = paymentStats?.[0]?.totalRevenue || 0;

  const OrdersInfo = [
    {
      status: 'Pending',
      total: orderStats.find((s) => s._id === 'pending')?.totalOrders || 0,
    },
    {
      status: 'Completed',
      total: orderStats.find((s) => s._id === 'accepted')?.totalOrders || 0,
    },
    {
      status: 'Cancelled',
      total: orderStats.find((s) => s._id === 'rejected')?.totalOrders || 0,
    },
  ];

  return {
    totalOrders: totalOrderCount,
    totalCars: totalCars,
    totalRevenue,
    OrdersInfo,
  };
};

export const adminMetaService = {
  getAdminMetaData,
};
