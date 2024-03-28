import {IDBClient} from '../../infrastructure/database/db_client';
import {IUserRepository, UserRepository} from "../repository/user_repository";
import { RequestCreateUser, CreateUserUseCase } from '../../usecase'
import { CreateUserSerialize, Response, UserResponseData } from '../serializer';

export class UserController {
  private userSelialize: CreateUserSerialize
  private userRepo: IUserRepository

  constructor(db: IDBClient) {
    this.userSelialize = new CreateUserSerialize()
    this.userRepo = new UserRepository(db)
  }

  public async createUser(body: RequestCreateUser): Promise<Response<UserResponseData>| Response<{}>> {
    try {
      const useCase = new CreateUserUseCase(this.userRepo)
      const res = await useCase.execute(body)
      return this.userSelialize.serialize(res)
    } catch (err) {
      console.log(err)
      return this.userSelialize.error(err as Error)  
    }
  }
}
