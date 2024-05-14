import * as request from 'supertest'

import { MongoManager } from '../../../../../src/infrastructure/database/mongo/client'
import { PinoLogger } from '../../../../../src/infrastructure/log/pino_logging'
import { HttpValidte } from '../../../../../src/infrastructure/middleware/http_validate'
import { ExpressServer } from '../../../../../src/infrastructure/server/server'

describe(__filename, () => {
  let db: MongoManager
  let server: ExpressServer

  beforeAll(async () => {
    const port = 8080
    const logger = new PinoLogger()
    db = new MongoManager(logger)
    const validate = new HttpValidte(logger)
    server = new ExpressServer(port, db, validate, logger)
    await server.run()
  })

  afterAll(async () => {
    await db.cleanUp()
    await server.down()
  })

  test('POST /user 正常系の場合、ステータスコード200を返す', async () => {
    const res = await request(server.app).post('/user').send({
      name: 'Kenta'
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.data).toEqual({ name: 'Kenta' })
  })

  test('POST /user HTTPリクエストの値が異なる場合、ステータスコード400を返す', async () => {
    const res = await request(server.app).post('/user').send({
      name: 'Taro',
      age: 10
    })
    expect(res.statusCode).toBe(400)
  })
})
