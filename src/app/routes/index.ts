import { Router } from 'express';
import { carRoutes } from '../modules/car/car.route';

const router = Router();

const appRoutes = [
  {
    path: '/cars',
    route: carRoutes,
  },
];

appRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
