import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './apps/middlewares/globalErrorHandler';
import routers from './apps/routes/routers';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Application routes
app.use('/api/v1', routers);

// Root api
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from university server! 💯');
});

//global error handler
app.use(globalErrorHandler);

//handle Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found 😟 does not exist ‼️',
    errorMessages: [
      {
        path: req.originalUrl, //showing notfound route
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
