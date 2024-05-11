import type { Db } from 'mongodb'

import { User } from '../../../../../src/domain/entity/user'
import { MongoManager } from '../../../../../src/infrastructure/database/mongo/client'
import { MongoUserRepository } from '../../../../../src/infrastructure/database/mongo/repository/user_repository'
import { ConsoleLogger } from '../../../../../src/infrastructure/log/console_logging'
import type { ILogger } from '../../../../../src/infrastructure/log/i_logger'

describe(__filename, () => {
  let mongoManager: MongoManager
  let logger: ILogger
  let db: Db
  beforeAll(async () => {
    logger = new ConsoleLogger()
    mongoManager = new MongoManager(logger)
    await mongoManager.connect()
    db = mongoManager.getDb('test')
  })

  afterEach(async () => {
    const userRepo = new MongoUserRepository(db, logger)
    await userRepo.deleteAll()
  })

  afterAll(async () => {
    await mongoManager.disconnect()
  })

  it('データの新規作成ができる', async () => {

    const userRepo = new MongoUserRepository(db, logger)
    const user = new User('testUser')

    await userRepo.save(user)

    const savedUser = await userRepo.findOne('testUser')
    expect(savedUser).not.toBeNull()
    expect(savedUser?.name).toEqual('testUser')
  })

  it('DBサーバーがダウンした場合にエラーが投げられる', async () => {
    const mockDb: Partial<Db> = {
      collection: jest.fn().mockReturnValue({
        insertOne: jest.fn().mockRejectedValue(new Error('DB connection error')),
      }),
    }
    const userRepo = new MongoUserRepository(mockDb as Db, logger)
    const user = new User('testUser')
    await expect(userRepo.save(user)).rejects.toThrow('DB connection error')
  })
})
