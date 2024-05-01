import type { IUserRepository } from '../../../adapter/repository/user_repository'

export class UserDomainService {
  private userRepo: IUserRepository
  constructor(repo: IUserRepository) {
    this.userRepo = repo
  }

  /**
   * すでに同じユーザー名が存在してる場合はtrue,そうでないならばfalseを返す
   * @param name
   * @returns
   */
  async isDupicateName(name: string) {
    const existUser = await this.userRepo.findOne(name)
    const isDuplicateName = !!existUser
    return isDuplicateName
  }
}
