import { IUserRepository } from '../../adapter/repository/user_repository'
import { User } from '../../domain/entity/user'
import { UserDomainService } from '../../domain/service/user/check_name_duplicate'

export type RequestCreateUser = {
  name: string,
}

export class CreateUserUsecase {
  private _userRepo: IUserRepository

  constructor(userRepo: IUserRepository) {
    this._userRepo = userRepo
  }

  public async execute(req: RequestCreateUser): Promise<User> {
    try {
      const isDuplicateName = await new UserDomainService(this._userRepo).isDupicateName(req.name)
      if (isDuplicateName) {
        throw new Error(`User name (${req.name})is Duplicate`)
      }
      const user = new User(req.name)
      await this._userRepo.save(user)
      return user
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }
}
