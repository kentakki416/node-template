import { MongoManager } from './infrastructure/database/mongo/client'
import { Logger } from './infrastructure/log/pino_logging'
import { ExpressServer } from './infrastructure/server/express_server'

(async (): Promise<void> => {
  const port = 8080
  const logger = new Logger()
  const mongoDB = new MongoManager(logger)
  await mongoDB.connect()
  const server = new ExpressServer(port, mongoDB, logger)
  await server.run()
})()

