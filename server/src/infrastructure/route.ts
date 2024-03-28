import { Express, Router} from 'express'
import { UserController } from '../adapter/controller/'
import { MongoClient } from './database/mongo/client'

export class ExpressServerRouter {
  private app: Express
  constructor(app: Express) {
    this.app = app
  }

  public routing(/**controllers: Controllers*/) {
    const router = Router()
    const repo = new MongoClient()
    const userController = new UserController(repo)
    router.get('/', (_, res, next) => {
       res.send('Hello World')
       next()
    })


    router.post('/users', async (req, res): Promise<void> => {
      const result = await userController.createUser(req.body)
      res.send(result)
    })
    
    this.app.use(router)
  }
}
