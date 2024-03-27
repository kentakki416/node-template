import IDBClient from "../../infrastructure/database/db_client"
import { UserCollection } from "../../type/db/user"

export default interface IUserRepository {
  insert(): Promise<any>
  findOne(id: number): Promise<any>
}

export class UserRepository implements IUserRepository {
  private store: IDBClient<UserCollection>
  private modelName: string

  public constructor(store: IDBClient<UserCollection>) {
    this.store = store
    this.modelName = 'User'
  }

  public async insert() {
    const res = await this.store.insert(this.modelName, {_id: 1, name: 'aaa'})
    return res
  }

  public async findOne(id: number) {
    const res = await this.store.findOne(this.modelName, id)
    return res
  }
}
