import * as express from 'express'
import Router from './route'

export class ExpressServer {
  private app = express()
  private port: number

  constructor(port = 8080/** , controllers: Controllers*/) {
    this.port = port
    new Router(this.app).routing(/**controllers*/)
  }

  async run() {
    this.app.listen(this.port)
    console.debug('express server runnnin ...')
  }
}
