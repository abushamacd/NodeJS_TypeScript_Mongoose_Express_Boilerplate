import { errorLogger, logger } from './utilities/logger'
import { main } from './utilities/main'
import { Server } from 'http'
let server: Server

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

main()

process.on('SIGTERM', () => {
  logger.info(`Sigterm is received`)
  if (server) {
    server.close()
  }
})
