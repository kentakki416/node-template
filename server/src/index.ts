import { ExpressServer } from "./infrastructure/express"

(async () => {
  const port = 8080
  const server = new ExpressServer(port)
  server.run()
})()

