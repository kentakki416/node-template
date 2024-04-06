import { User } from '../../domain/entity/user'

export interface IUserRepository {
  save(user: User): Promise<void>
  update(user: User): Promise<void>
  findById(id: User['id']): Promise<User|null>
  findOne(name: User['name']): Promise<User|null>
}

// export class UserRepository implements IUserRepository {
//   private store: IDBClient
//   private modelName: string

//   public constructor(store: IDBClient) {
//     this.store = store
//     this.modelName = 'User'
//   }

//   public async insert(params: User) {
//     const res = await this.store.insert(this.modelName, params)
//     return res
//   }

//   public async findById(id: number) {
//     const res = await this.store.findById(this.modelName, id)
//     return res
//   }

//   public async findOne(projection: object) {
//     const res = await this.store.findOne(this.modelName, projection)
//     return res
//   }
// }
