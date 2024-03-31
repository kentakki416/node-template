import { User } from '../../domain'
import { IDBClient } from '../../infrastructure/database/'
import type { UserCollection } from '../../types/db'

export interface IUserRepository {
  insert(params: User): Promise<UserCollection>
  findOne(id: number): Promise<UserCollection | null>
}

export class UserRepository implements IUserRepository {
  private store: IDBClient
  private modelName: string

  public constructor(store: IDBClient) {
    this.store = store
    this.modelName = 'User'
  }

  public async insert(params: User): Promise<UserCollection> {
    const res = await this.store.insert(this.modelName, params)
    return res
  }

  public async findOne(id: number): Promise<UserCollection | null> {
    const res = await this.store.findOne(this.modelName, id)
    return res
  }
}
