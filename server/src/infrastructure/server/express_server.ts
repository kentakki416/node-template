import * as express from 'express'
import pinoHttp from 'pino-http'

import { ExpressServerRouter } from './route'
import { Logger } from '../log/i_logger'

export class ExpressServer {
  private _app: express.Express
  private _port: number
  private _logger: Logger

  constructor(port: number) {
    this._app = express()
    this._port = port
    this._logger = new Logger()
  }

  async run(): Promise<void> {
    // req.bodyのパース結果をオブジェクトとして受け取るために追加
    this._app.use(express.json()) // JSON形式に対応
    this._app.use(express.urlencoded({ extended: true })) // HTMLフォームの「キー=値」形式に対応

    this._app.use(pinoHttp({ logger: this._logger.getLogger() })) // HTTPのロガー

    new ExpressServerRouter(this._app, this._logger).routing()

    this._app.listen(this._port)
    this._logger.debug('express server runnning ...')
  }
}
