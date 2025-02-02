import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import handleGlobalError from './app/middlewares/globalErrorHandler';
import handleNotFoundRoute from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://car-store-backend.vercel.app'],
    credentials: true,
  })
);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Car Store server',
  });
});

app.use('/api/v1', router);

app.use(handleNotFoundRoute);
app.use(handleGlobalError);

export default app;
