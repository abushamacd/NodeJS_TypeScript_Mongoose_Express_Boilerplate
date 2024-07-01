/* eslint-disable no-console */
import mongoose from 'mongoose'
import config from '../config'
import app from '../app'
import { errorLogger, logger } from './logger'
import { Server } from 'http'
let server: Server

export async function main() {
  try {
    await mongoose.connect(config.db_uri as string)
    server = app.listen(config.port, (): void => {
      logger.info(
        config.env === 'development'
          ? `==== ✌️  Your server is running on http://localhost:${config.port} ====`
          : `==== Test on deployed live server ====`
      )
    })
    logger.info(`==== ✌️  Database Connection Successful ====`)
  } catch (error) {
    errorLogger.error(`==== 🤞  Database Connection Error ====`, error)
  }

  process.on('unhandledRejection', error => {
    console.log(error)
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
