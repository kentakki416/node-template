import type { ILogger } from '../../../infrastructure/log/i_logger'
import { RequestCreateUser, CreateUserUsecase } from '../../../usecase/user/create_user'
import { Response } from '../../serializer/base_serializer'
import { UserResponseData, UserSerializer } from '../../serializer/user/user_create_serializer'

export class UserCreateController {
  private _selializer: UserSerializer
  private _usecase: CreateUserUsecase
  private _logger: ILogger

  constructor(selializer: UserSerializer, usecase: CreateUserUsecase, logger: ILogger) {
    this._selializer = selializer
    this._usecase = usecase
    this._logger = logger
  }

  public async execute(body: RequestCreateUser): Promise<Response<UserResponseData>| Response<object>> {
    try {
      const res = await this._usecase.execute(body)
      return this._selializer.create(res)
    } catch (err) {
      this._logger.error(err as Error)
      return this._selializer.error(err as Error)
    }
  }
}
