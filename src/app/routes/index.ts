import { Router } from 'express';
import { adminRoute } from '../modules/admin/admin.route';
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
    path: '/admin',
    route: adminRoute,
  },
];

appRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
