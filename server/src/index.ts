import { ExpressServer } from './infrastructure/express/express'

(async (): Promise<void> => {
  const port = 8080
  const server = new ExpressServer(port)
  server.run()
})()

