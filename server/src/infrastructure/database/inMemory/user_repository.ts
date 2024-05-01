import type { IUserRepository } from '../../../adapter/repository/user_repository'
import type { User } from '../../../domain/entity/user'

export class InMemoryUserRepository implements IUserRepository {
  public DB: {
    [id: number]: User;
  } = {}

  async save(user: User) {
    this.DB[user.id] = user
  }

  async update(user: User) {
    this.DB[user.id] = user
  }

  async findById(userId: User['id']): Promise<User|null> {
    const user = this.DB[userId]
    return user || null
  }

  async findOne(name: User['name']): Promise<User|null> {
    const user = Object.values(this.DB).filter((user) => { return user.name === name})
    return user[0] || null
  }

  refresh() {
    this.DB = {}
  }
}
