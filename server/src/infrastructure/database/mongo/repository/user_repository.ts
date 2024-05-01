import type { IUserRepository } from '../../../../adapter/repository/user_repository'
import { User } from '../../../../domain/entity/user'
import type { ILogger } from '../../../log/i_logger'
import { UserModel } from '../models/user'

export class MongoUserRepository implements IUserRepository {
  private _logger
  constructor(logger: ILogger) {
    this._logger = logger
  }

  async save(user: User) {
    try {
      await UserModel.create(user)
    } catch(err) {
      this._logger.error(err as Error)
      throw new Error((err as Error).message)
    }
  }

  async update(user: User) {
    try {
      await UserModel.updateOne()
    } catch (err) {
      this._logger.error(err as Error)
      throw new Error((err as Error).message)
    }
  }

  async findById(id: User['id']) {
    try {
      const data = await UserModel.findById(id)
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
      const data = await UserModel.findOne({ name: name })
      if (!data || Object.keys(data).length === 0) {
        return null
      }
      return new User(data.name)
    } catch (err) {
      this._logger.error(err as Error)
      throw new Error((err as Error).message)
    }
  }
}
