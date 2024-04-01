import { IDBClient } from '../../infrastructure/database'
import type { ILogger } from '../../infrastructure/logger'
import { RequestCreateUser, CreateUserUsecase } from '../../usecase'
import { ReadUserUsecase, RequestReadUser } from '../../usecase/user/'
import { IUserRepository, UserRepository } from '../repository/user_repository'
import { UserSerializer, Response, UserResponseData } from '../serializer'

export class UserController {
  private _selializer: UserSerializer
  private _userRepo: IUserRepository
  private _logger: ILogger

  constructor(db: IDBClient, logger: ILogger) {
    this._selializer = new UserSerializer()
    this._userRepo = new UserRepository(db)
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
