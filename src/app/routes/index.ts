import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { carRoutes } from '../modules/car/car.route';
import { orderRoutes } from '../modules/orders/order.route';
import { userRoutes } from '../modules/user/user.route';

const router = Router();

const appRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/cars',
    route: carRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

appRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
