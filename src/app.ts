import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import handleGlobalError from './app/middlewares/globalErrorHandler';
import handleNotFoundRoute from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

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
