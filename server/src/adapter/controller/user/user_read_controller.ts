import type { ILogger } from '../../../infrastructure/log/i_logger'
import { RequestReadUser, type ReadUserUsecase } from '../../../usecase/user/find_user'
import { Response } from '../../serializer/base_serializer'
import { UserResponseData, UserSerializer } from '../../serializer/user/user_create_serializer'

export class UserReadController {
  private _selializer: UserSerializer
  private _userUsecase: ReadUserUsecase
  private _logger: ILogger

  constructor(userUsecase: ReadUserUsecase, logger: ILogger) {
    this._selializer = new UserSerializer()
    this._userUsecase = userUsecase
    this._logger = logger
  }

  public async execute(body: RequestReadUser): Promise<Response<UserResponseData|null> | Response<object>> {
    try {
      const res = await this._userUsecase.execute(body)
      return this._selializer.findOne(res)
    } catch (err) {
      this._logger.error(err as Error)
      return this._selializer.error(err as Error)
    }
  }
}
