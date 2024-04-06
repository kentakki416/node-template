import { IUserRepository } from '../../adapter/repository/user_repository'
import { User } from '../../domain/entity'

export type RequestReadUser = {
  id: number
}

export class ReadUserUsecase {
  private userRepo: IUserRepository

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo
  }

  public async execute(req: RequestReadUser): Promise<User|null> {
    try {
      const res = await this.userRepo.findById(req.id)
      if (!res) {
        return null
      }
      const user = new User(res.name)
      return user
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }
}
