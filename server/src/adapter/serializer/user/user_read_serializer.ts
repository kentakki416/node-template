import CONSTANT from '../../../constant'
import { User } from '../../../domain/entity/user'
import { BaseSerializer, Response } from '../base_serializer'

export interface UserResponseData {
  id: number
  name: string
}

export class UserReadSerializer extends BaseSerializer {
  public execute(data: User| null): Response<UserResponseData> {
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
