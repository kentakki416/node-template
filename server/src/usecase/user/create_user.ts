import { User } from '../../domain'
import {IUserRepository} from '../../adapter/repository/user_repository'

export type RequestCreateUser = {
  name: string,
}

export class CreateUserUsecase {
  private userRepo: IUserRepository

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo
  }

  public execute(req: RequestCreateUser): Promise<User> {
    const user = new User(req.name)
    return this.userRepo.insert(user)
  }
}
