import { Express, Router } from 'express'

import { UserController } from '../../adapter/controller/user_controller'
import { MongoClient } from '../database/mongo/client'
import type { ILogger } from '../log/i_logger'

export class ExpressServerRouter {
  private _app: Express
  private _logger: ILogger
  constructor(app: Express, logger: ILogger) {
    this._app = app
    this._logger = logger
  }

  public routing(): void {

    const router = Router()
    const db = new MongoClient(this._logger)
    // TODO: APIを全て書くと肥大化するのでControllerのファイルごとにrouterを作成するようにする

    const userController = new UserController(db, this._logger)

    router.get('/', (req, res, next) => {
      req.log.info('Hello World がログに出力されましたよ')
      res.send('Hello World')
      next()
    })

    router.get('/user', async (req, res): Promise<void> => {
      const result = await userController.findOne(req.body)
      res.send(result)
    })

    router.post('/users', async (req, res): Promise<void> => {
      const result = await userController.createUser(req.body)
      res.send(result)
    })

    this._app.use(router)
  }
}
