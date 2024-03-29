import * as express from "express"
import { ExpressServerRouter } from "./route"

export class ExpressServer {
  private app = express()
  private port: number

  constructor(port = 8080) {
    this.port = port
  }

  async run() {
    // req.bodyのパース結果をオブジェクトとして受け取るために追加
    this.app.use(express.json()) // JSON形式に対応
    this.app.use(express.urlencoded({ extended: true })) // HTMLフォームの「キー=値」形式に対応

    new ExpressServerRouter(this.app).routing()

    this.app.listen(this.port)
    // console.debug("express server runnning ...")
  }
}
