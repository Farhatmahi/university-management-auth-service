import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

async function connect() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Connected to MongoDB')

    app.listen(config.port, () => {
      logger.info(`Listening on PORT : ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect to MongoDB', error)
  }
}
connect()
