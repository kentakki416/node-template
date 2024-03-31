import { IUserRepository } from '../../adapter/repository/user_repository'
import { User } from '../../domain'

export type RequestCreateUser = {
  name: string,
}

export class CreateUserUsecase {
  private userRepo: IUserRepository

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo
  }

  public async execute(req: RequestCreateUser): Promise<User> {
    const user = new User(req.name)
    const res = await this.userRepo.insert(user)
    const newUser = new User(res.name)
    return newUser
  }
}
