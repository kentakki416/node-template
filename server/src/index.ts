import { ExpressServer } from './infrastructure/server/express_server'

(async (): Promise<void> => {
  const port = 8080
  const server = new ExpressServer(port)
  await server.run()
})()

