import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { Server } from 'http';

process.on('uncaughtException', err => {
  console.log(err);
  process.exit(1);
});

let serverStatus: Server;

// connectivity
async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    // infoconsole.log('♻️  Database connected✅');
    console.log(`♻️  Database is connected successfully✌️`);

    serverStatus = app.listen(config.port, () => {
      // infoconsole.log(`Application app listening on port ${config.port}`);
      console.log(`Application app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('🙇‍♂️👎Failed connect to database', err);
  }

  process.on('unhandleRejection', error => {
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
