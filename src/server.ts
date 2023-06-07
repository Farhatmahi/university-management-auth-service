import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';
import { errorLogger, logger } from './shared/logger';

process.on('uncaughtException', err => {
  errorLogger.error(err);
  process.exit(1);
});

let server: Server;

async function connect() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('🐚 Connected to MongoDB');

    server = app.listen(config.port, () => {
      logger.info(`👂 Listening on PORT : ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('Failed to connect to MongoDB', error);
  }

  //graceful shutdown
  process.on('unhandledRejection', error => {
    // errorLogger.error(error)
    logger.info(error);
    // console.log(error)
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

//Signal termination
process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});

connect();
