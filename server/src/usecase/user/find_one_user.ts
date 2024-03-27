import { UserRepository } from "../../adapter/repository/user"

export class ListUserUseCase {
  private userRepo: UserRepository
  public constructor(userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  public async execute(id: number) {
    const res = await this.userRepo.findOne(id)
    return res
  }
}
