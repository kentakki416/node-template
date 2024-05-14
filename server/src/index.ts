import { MongoManager } from './infrastructure/database/mongo/client'
import { PinoLogger } from './infrastructure/log/pino_logging'
import { HttpValidte } from './infrastructure/middleware/http_validate'
import { ExpressServer } from './infrastructure/server/server'

(async (): Promise<void> => {
  const port = 8080
  const logger = new PinoLogger()
  const mongoDB = new MongoManager(logger)
  await mongoDB.connect()
  const validate = new HttpValidte(logger)
  const server = new ExpressServer(port, mongoDB, validate, logger)
  await server.run()
})()

