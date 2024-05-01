import { MongoClient, Db } from 'mongodb'

import type { ILogger } from '../../log/i_logger'

export class MongoManager {
  client: MongoClient
  private _logger: ILogger

  public constructor(logger: ILogger) {
    this.client = new MongoClient('mongodb://localhost:27017/my_database')
    this._logger = logger
    this.connect()
  }

  public async connect(): Promise<void> {
    try {
      await this.client.connect()
      this._logger.info('mongo client is connected!!!')
    } catch (err) {
      this._logger.error(err as Error)
      throw new Error((err as Error).message)
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.client.close()
      this._logger.info('mongo client is disconnected!!!')
    } catch (err) {
      this._logger.error(err as Error)
      throw new Error((err as Error).message)
    }
  }

  public getDb(dbName: string): Db {
    return this.client.db(dbName)
  }
}
