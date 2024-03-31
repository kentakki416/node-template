import * as express from "express"
import { ExpressServerRouter } from "./route"
import pinoHttp from "pino-http"
import {Logger} from '../logger'

export class ExpressServer {
  private app = express()
  private port: number
  private logger = new Logger()

  constructor(port = 8080) {
    this.port = port
  }

  async run() {
    // req.bodyのパース結果をオブジェクトとして受け取るために追加
    this.app.use(express.json()) // JSON形式に対応
    this.app.use(express.urlencoded({ extended: true })) // HTMLフォームの「キー=値」形式に対応

    this.app.use(pinoHttp({logger: this.logger.getLogger()}));
    new ExpressServerRouter(this.app).routing()

    this.app.listen(this.port)
   this.logger.debug("express server runnning ...")
  }
}
