import { Express, Router } from 'express'

import { UserController } from '../../adapter/controller/user_controller'
import { MongoManager } from '../database/mongo/client'
import type { ILogger } from '../log/i_logger'
import { MongoUserRepository } from '../database/mongo/repository/user_repository'

export class ExpressServerRouter {
  private _app: Express
  private _logger: ILogger
  constructor(app: Express, logger: ILogger) {
    this._app = app
    this._logger = logger
  }

  public routing(): void {

    const router = Router()
    const mongoManager = new MongoManager(this._logger)
    const db = mongoManager.getDb('test')
    const userRepo = new MongoUserRepository(db, this._logger)
    // TODO: APIを全て書くと肥大化するのでControllerのファイルごとにrouterを作成するようにする

    const userController = new UserController(userRepo, this._logger)

    router.get('/', (req, res, next) => {
      req.log.info('Hello World がログに出力されましたよ')
      res.send('Hello World')
      next()
    })

    router.get('/user', async (req, res): Promise<void> => {
      const userRepository = MongoUserRepository
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
