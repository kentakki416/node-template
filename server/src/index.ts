import { ExpressServer } from './infrastructure/express'

(async (): Promise<void> => {
  const port = 8080
  const server = new ExpressServer(port)
  await server.run()
})()

