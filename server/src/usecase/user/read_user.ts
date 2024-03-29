import { IUserRepository } from "../../adapter/repository/user_repository";
import { User } from "../../domain";

export type RequestReadUser = {
  id: number
}

export class ReadUserUsecase {
  private userRepo: IUserRepository

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo
  }

  public async execute(req: RequestReadUser): Promise<User> {
    const res = await this.userRepo.findOne(req.id)
    const user = new User(res!.name)
    return user
  }
}
