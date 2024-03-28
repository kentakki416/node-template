import {User} from '../../domain'
import {IDBClient} from "../../infrastructure/database/db_client"

export interface IUserRepository {
  insert(params: User): Promise<User>
  findOne(id: number): Promise<any>
}

export class UserRepository implements IUserRepository {
  private store: IDBClient
  private modelName: string

  public constructor(store: IDBClient) {
    this.store = store
    this.modelName = 'User'
  }

  public async insert(params: User): Promise<User> {
    const res = await this.store.insert(this.modelName, params) as User
    return res
  }

  public async findOne(id: number): Promise<User> {
    const res = await this.store.findOne(this.modelName, id) as User
    return res
  }
}
