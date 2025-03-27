import { Router } from 'express';
import { adminRoute } from '../modules/admin/admin.route';
import { blogRoutes } from '../modules/blog/blog.routes';
import { carRoutes } from '../modules/car/car.route';
import { adminMetaRoutes } from '../modules/meta/adminMeta/adminMeta.route';
import { userMetaRoutes } from '../modules/meta/userMeta/userMeta.route';
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
    path: '/blog',
    route: blogRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/admin-meta',
    route: adminMetaRoutes,
  },
  {
    path: '/user-meta',
    route: userMetaRoutes,
  },
];

appRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
