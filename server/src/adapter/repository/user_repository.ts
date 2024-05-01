import { User } from '../../domain/entity/user'

export interface IUserRepository {
  save(user: User): Promise<void>
  update(user: User): Promise<void>
  findById(id: User['id']): Promise<User|null>
  findOne(name: User['name']): Promise<User|null>
}
