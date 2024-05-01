import { Express, Router } from 'express'

import { UserReadController } from '../../adapter/controller/user/user_read_controller'
import { MongoManager } from '../database/mongo/client'
import type { ILogger } from '../log/i_logger'
import { MongoUserRepository } from '../database/mongo/repository/user_repository'
import { CreateUserUsecase } from '../../usecase/user/create_user'
import { ReadUserUsecase } from '../../usecase/user/find_user'
import { UserCreateController } from '../../adapter/controller/user/user_create_controller'
import { UserSerializer } from '../../adapter/serializer/user/user_serialize'

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

    router.get('/', (req, res, next) => {
      req.log.info('Hello World がログに出力されましたよ')
      res.send('Hello World')
      next()
    })

    router.get('/user', async (req, res): Promise<void> => {
      const usecase = new ReadUserUsecase(userRepo)
      const userController = new UserReadController(usecase, this._logger)
      const result = await userController.execute(req.body)
      res.send(result)
    })

    router.post('/users', async (req, res): Promise<void> => {
      const selializer = new UserSerializer()
      const usecase = new CreateUserUsecase(userRepo)
      const userController = new UserCreateController(selializer, usecase, this._logger)
      const result = await userController.execute(req.body)
      res.send(result)
    })

    this._app.use(router)
  }
}
