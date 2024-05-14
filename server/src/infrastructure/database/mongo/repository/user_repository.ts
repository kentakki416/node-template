import { ObjectId, type Collection, type Db, type Document } from 'mongodb'

import type { IUserRepository } from '../../../../adapter/repository/user_repository'
import { User } from '../../../../domain/entity/user'
import type { ILogger } from '../../../log/i_logger'

export class MongoUserRepository implements IUserRepository {
  private _collection: Collection<Document>
  private _logger: ILogger
  constructor(db: Db, logger: ILogger) {
    this._collection = db.collection('User')
    this._logger = logger
  }

  async save(user: User) {
    try {
      await this._collection.insertOne({
        name: user.name
      })
    } catch(err) {
      this._logger.error(err as Error)
      throw new Error((err as Error).message)
    }
  }

  async update(user: User) {
    try {
      // TODO 対応必要
      await this._collection.updateOne({ _id: ObjectId }, { $set: user })
    } catch (err) {
      this._logger.error(err as Error)
      throw new Error((err as Error).message)
    }
  }

  async findById(id: ObjectId) {
    try {
      const data = await this._collection.findOne({ _id: id })
      if (!data || Object.keys(data).length === 0) {
        return null
      }
      return new User(data.name)
    } catch (err) {
      this._logger.error(err as Error)
      throw new Error((err as Error).message)
    }
  }

  async findOne(name: User['name']) {
    try {
      const data = await this._collection.findOne({ name: name })
      if (!data || Object.keys(data).length === 0) {
        return null
      }
      return new User(data.name)
    } catch (err) {
      this._logger.error(err as Error)
      throw new Error((err as Error).message)
    }
  }

  async delete(name: User['name']) {
    try {
      await this._collection.deleteOne({ name: name })
    } catch (err) {
      this._logger.error(err as Error)
      throw new Error((err as Error).message)
    }
  }

  async deleteAll() {
    try {
      await this._collection.deleteMany()
    } catch (err) {
      this._logger.error(err as Error)
      throw new Error((err as Error).message)
    }
  }
}
