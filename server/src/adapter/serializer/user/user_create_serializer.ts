import CONSTANT from '../../../../constant'
import { User } from '../../../domain/entity/user'
import { BaseSerializer, Response } from '../base_serializer'

export interface UserResponseData {
  id: number
  name: string
}

export class UserCreateSerializer extends BaseSerializer {
  public execute(data: User): Response<UserResponseData> {
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
}
