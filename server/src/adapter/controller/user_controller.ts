import type { ILogger } from '../../infrastructure/log/i_logger'
import { RequestCreateUser, CreateUserUsecase } from '../../usecase/user/create_user'
import { ReadUserUsecase, RequestReadUser } from '../../usecase/user/find_user'
import { IUserRepository } from '../repository/user_repository'
import { Response } from '../serializer/base_serializer'
import { UserResponseData, UserSerializer } from '../serializer/user/user_serialize'

export class UserController {
  private _selializer: UserSerializer
  private _userRepo: IUserRepository
  private _logger: ILogger

  constructor(userRepo: IUserRepository, logger: ILogger) {
    this._selializer = new UserSerializer()
    this._userRepo = userRepo
    this._logger = logger
  }

  public async createUser(body: RequestCreateUser): Promise<Response<UserResponseData>| Response<object>> {
    try {
      const useCase = new CreateUserUsecase(this._userRepo)
      const res = await useCase.execute(body)
      return this._selializer.create(res)
    } catch (err) {
      this._logger.error(err as Error)
      return this._selializer.error(err as Error)
    }
  }

  public async findOne(body: RequestReadUser): Promise<Response<UserResponseData|null> | Response<object>> {
    try {
      const useCase = new ReadUserUsecase(this._userRepo)
      const res = await useCase.execute(body)
      return this._selializer.findOne(res)
    } catch (err) {
      this._logger.error(err as Error)
      return this._selializer.error(err as Error)
    }
  }
}
