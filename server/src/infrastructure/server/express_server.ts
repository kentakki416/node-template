import * as express from 'express'
import pinoHttp from 'pino-http'
import * as http from 'http'

import { ExpressServerRouter } from './route'
import type { Logger } from '../log/pino_logging'
import type { MongoManager } from '../database/mongo/client'

export class ExpressServer {
  private _app: express.Express
  private _port: number
  private _db: MongoManager
  private _logger: Logger
  private _server: http.Server| undefined

  constructor(port: number, db: MongoManager, logger: Logger) {
    this._app = express()
    this._port = port
    this._db = db
    this._logger = logger
  }

  async run(): Promise<void> {
    // req.bodyのパース結果をオブジェクトとして受け取るために追加
    this._app.use(express.json()) // JSON形式に対応
    this._app.use(express.urlencoded({ extended: true })) // HTMLフォームの「キー=値」形式に対応
    this._app.use(pinoHttp({ logger: this._logger.getLogger() })) // HTTPのロガー

    await new ExpressServerRouter(this._app, this._db, this._logger).routing()

    this._server = this._app.listen(this._port)
    this._logger.debug('express server runnning ...')

    process.on('SIGTERM', this.gracefulShutdown.bind(this));
    process.on('SIGINT', this.gracefulShutdown.bind(this));
  }


  gracefulShutdown(): void {
    this._logger.debug('Received kill signal, shutting down gracefully.');
    if (!this._server) {
      process.exit(1)
    }
    this._server.close(async (err: any) => {
      this._logger.debug('Closed out remaining connections.');
      if (err) {
        console.error(err)
        process.exit(1)
      }
      // データベース接続を閉じる
      try {
        await this._db.disconnect();
        process.exit(0) // disconnect成功時は正常終了
      } catch (dbErr) {
        process.exit(1) // disconnect失敗時は異常終了
      }
    });
  }
}
