import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { CarRoutes } from './app/modules/car/car.route';
import { orderRoute } from './app/modules/orders/order.route';
const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/api/cars', CarRoutes);
app.use('/api/orders', orderRoute);
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Car Store server',
  });
});

export default app;
