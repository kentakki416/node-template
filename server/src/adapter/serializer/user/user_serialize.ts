import CONSTANT from '../../../constant'
import { User } from '../../../domain/entity/user'
import { BaseSerializer, Response } from '../base_serializer'

export interface IUserSerialize {
  serialize(data: User): Response<UserResponseData>
}
export interface UserResponseData {
  id: number
  name: string
}

export class UserSerializer extends BaseSerializer {
  public create(data: User): Response<UserResponseData> {
    if (!data) {
      return {
        code: CONSTANT.STATUS_CODE.SERVER_ERROR,
        message: 'data is null',
        responsedAt: new Date(),
      }
    }

    return {
      code: CONSTANT.STATUS_CODE.SUCCESS,
      data: {
        id: data.id,
        name: data.name
      },
      responsedAt: new Date()
    }
  }

  public findOne(data: User| null): Response<UserResponseData> {
    if (!data) {
      return {
        code: CONSTANT.STATUS_CODE.NOT_FOUND,
        message: 'user is not found',
        responsedAt: new Date(),
      }
    }

    return {
      code: CONSTANT.STATUS_CODE.SUCCESS,
      data: {
        id: data.id,
        name: data.name
      },
      responsedAt: new Date()
    }
  }
}
