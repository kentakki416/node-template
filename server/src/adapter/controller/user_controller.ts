import { IDBClient } from '../../infrastructure/database'
import { RequestCreateUser, CreateUserUsecase } from '../../usecase'
import { ReadUserUsecase, RequestReadUser } from '../../usecase/user/'
import { IUserRepository, UserRepository } from '../repository/user_repository'
import { UserSerialize, Response, UserResponseData } from '../serializer'

export class UserController {
  private userSelialize: UserSerialize
  private userRepo: IUserRepository

  constructor(db: IDBClient) {
    this.userSelialize = new UserSerialize()
    this.userRepo = new UserRepository(db)
  }

  public async createUser(body: RequestCreateUser): Promise<Response<UserResponseData>| Response<object>> {
    try {
      const useCase = new CreateUserUsecase(this.userRepo)
      const res = await useCase.execute(body)
      return this.userSelialize.create(res)
    } catch (err) {
      // console.log(err)
      return this.userSelialize.error(err as Error)  
    }
  }

  public async findOne(body: RequestReadUser): Promise<Response<UserResponseData> | Response<object>> {
    try {
      const useCase = new ReadUserUsecase(this.userRepo)
      const res = await useCase.execute(body)
      return this.userSelialize.findOne(res)
    } catch (err) {
      // console.log(err)
      return this.userSelialize.error(err as Error)
    }
  }
}
