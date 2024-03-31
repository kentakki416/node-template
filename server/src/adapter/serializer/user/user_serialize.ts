import { BaseSerialize, Response } from "../base_serialize"
import { User } from "../../../domain"
import CONSTANT from "../../../constant"

export interface UserResponseData {
  id: number
  name: string
}

export class UserSerialize extends BaseSerialize {
  public create(data: User): Response<UserResponseData> {
    if (!data) {
      return {
        code: CONSTANT.STATUS_CODE.SERVER_ERROR,
        message: "data is null",
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

  public findOne(data: User): Response<UserResponseData> {
    if (!data) {
      return {
        code: CONSTANT.STATUS_CODE.NOT_FOUND,
        message: "user is not found",
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
