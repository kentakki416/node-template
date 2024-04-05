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
    try {
      const existUser = await this.userRepo.findOne({ name: req.name })
      const user = new User(req.name, existUser?.name)
      const res = await this.userRepo.insert(user)
      const newUser = new User(res.name)
      return newUser  
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }
}
