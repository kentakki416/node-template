import * as express from 'express'
import pinoHttp from 'pino-http'

import * as http from 'http'

import { ExpressRouter } from './route'
import type { MongoManager } from '../database/mongo/client'
import type { PinoLogger } from '../log/pino_logging'
import type { IHttpValidate } from '../middleware/http_validate_interface'

export class ExpressServer {
  private _app: express.Express
  private _port: number
  private _db: MongoManager
  private _validte: IHttpValidate
  private _logger: PinoLogger
  private _server: http.Server| undefined

  constructor(port: number, db: MongoManager, validate: IHttpValidate,logger: PinoLogger) {
    this._app = express()
    this._port = port
    this._db = db
    this._validte = validate
    this._logger = logger
  }

  get app(): express.Express {
    return this._app
  }

  async run(): Promise<void> {
    // req.bodyのパース結果をオブジェクトとして受け取るために追加
    this._app.use(express.json()) // JSON形式に対応
    this._app.use(express.urlencoded({ extended: true })) // HTMLフォームの「キー=値」形式に対応
    this._app.use(pinoHttp({ logger: this._logger.getLogger() })) // HTTPのロガー(Pinoに依存)

    this._app.use(this._validte.middleware())

    const expressRouter = new ExpressRouter(this._db, this._logger)
    const router = await expressRouter.routing()
    this._app.use(router)

    this._server = this._app.listen(this._port)

    this._logger.info('express server runnning ...')

    process.on('SIGTERM', this.gracefulShutdown.bind(this))
    process.on('SIGINT', this.gracefulShutdown.bind(this))
  }

  async down(): Promise<void> {
    if (!this._server) {
      process.exit(1)
    }
    await new Promise((resolve, reject) => {
      this._server!.close((err) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
    await this._db.disconnect()
  }

  gracefulShutdown(): void {
    this._logger.warn('Received kill signal, shutting down gracefully.')
    if (!this._server) {
      process.exit(1)
    }
    this._server.close(async (err?: Error) => {
      this._logger.warn('Closed out remaining connections.')
      if (err) {
        this._logger.error(err)
        process.exit(1)
      }
      // データベース接続を閉じる
      try {
        await this._db.disconnect()
        process.exit(0) // disconnect成功時は正常終了
      } catch (dbErr) {
        process.exit(1) // disconnect失敗時は異常終了
      }
    })
  }
}
