import { User } from '../../domain'
import { IDBClient } from '../../infrastructure/database/'
import type { UserCollection } from '../../types/db'

export interface IUserRepository {
  insert(params: User): Promise<UserCollection>
  findById(id: number): Promise<UserCollection | null>
  findOne(projection: object): Promise<UserCollection | null>
}

export class UserRepository implements IUserRepository {
  private store: IDBClient
  private modelName: string

  public constructor(store: IDBClient) {
    this.store = store
    this.modelName = 'User'
  }

  public async insert(params: User) {
    const res = await this.store.insert(this.modelName, params)
    return res
  }

  public async findById(id: number) {
    const res = await this.store.findById(this.modelName, id)
    return res
  }

  public async findOne(projection: object) {
    const res = await this.store.findOne(this.modelName, projection)
    return res
  }
}
