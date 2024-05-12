import { MongoClient, Db } from 'mongodb'

import type { ILogger } from '../../log/i_logger'

export class MongoManager {
  client: MongoClient
  private _logger: ILogger
  public constructor(logger: ILogger,) {
    const mongoURI = process.env.NODE_ENV === 'dev'? 'mongodb://root:password@mongo:27017' : 'mongodb://root:password@localhost:27017'
    this.client = new MongoClient(process.env.MONGODB_URI || mongoURI  )
    this._logger = logger
  }

  public async connect(): Promise<void> {
    const maxRetries = 5
    for (let i = 0; i < maxRetries; i++) {
      try {
        await this.client.connect()
        this._logger.info('MongoDB is connected!!!')
        break //接続に成功したらループを抜ける
      } catch (err) {
        this._logger.error(err as Error)
        if (i === maxRetries -1) {
          this._logger.error(new Error('MongoDB connection retry limit reached'))
          process.exit(1)
        }
        // ５秒間処理を停止する
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.client.close()
      this._logger.info('MongoDB is disconnected!!!')
    } catch (err) {
      this._logger.error(err as Error)
      throw new Error((err as Error).message)
    }
  }

  public getDb(dbName: string): Db {
    return this.client.db(dbName)
  }
}
