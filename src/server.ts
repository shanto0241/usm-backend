import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './apps/middlewares/globalErrorHandler';
import routers from './apps/routes/routers';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import config from './config/index';
import { Server } from 'http';

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
  res.send('Hello from university server! ');
});

//global error handler
app.use(globalErrorHandler);

//handle Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found  does not exist ‼️',
    errorMessages: [
      {
        path: req.originalUrl, //showing notfound route
        message: 'API Not Found',
      },
    ],
  });
  next();
});

// Process termination handling
process.on('uncaughtException', (err) => {
  console.log(err);
  process.exit(1);
});

let serverStatus: Server;

// connectivity
async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`♻️ Database is connected successfully✌️`);

    serverStatus = app.listen(config.port, () => {
      console.log(`Application app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('‍♂️Failed connect to database', err);
  }

  process.on('unhandledRejection', (error) => {
    if (serverStatus) {
      serverStatus.close(() => {
        console.log('Server closed ', error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

server();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (serverStatus) {
    serverStatus.close();
  }
});

export default app; // Export the app instance for potential external usage
