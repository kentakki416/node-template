import { Express, Router} from 'express'
// import {Controllers} from '../adapter/controller'

export default class ExpressServerRouter {
  private app: Express
  constructor(app: Express) {
    this.app = app
  }

  public routing(/**controllers: Controllers*/) {
    const router = Router()

    router.get('/', (_, res, next) => {
       res.send('Hello World')
       next()
    })

    // TODO: APIが増えたらここに追加する
    
    this.app.use(router)
  }
}
