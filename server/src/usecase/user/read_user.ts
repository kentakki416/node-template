import { IUserRepository } from '../../adapter/repository/user_repository';
import type { User } from '../../domain';

export type RequestReadUser = {
  id: number
}

export class ReadUserUsecase {
  private userRepo: IUserRepository

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo
  }

  public execute(req: RequestReadUser): Promise<User> {
    return this.userRepo.findOne(req.id)
  }
}
