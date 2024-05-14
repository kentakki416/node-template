import CONSTANT from '../../../constant'
import { User } from '../../../domain/entity/user'
import { BaseSerializer, Response } from '../base_serializer'

export type UserResponseData = {
  name: string
}

export class UserCreateSerializer extends BaseSerializer {
  /**
   *  レスポンスに必要なプロパティを持っているかのチェック
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private hasRequiredProperties(obj: any, requiredProperties: string[]): boolean {
    return requiredProperties.every(prop => {
      if (typeof obj[prop] === 'object' && obj[prop] !== null) {
        return this.hasRequiredProperties(obj[prop], Object.keys(obj[prop]))
      } else {
        return obj && Object.prototype.hasOwnProperty.call(obj, prop)
      }
    })
  }

  public execute(data: User): Response<UserResponseData> {
    const userRequiredProperties = Object.keys(data) as (keyof UserResponseData)[]

    if (!data || !this.hasRequiredProperties(data, userRequiredProperties)) {
      return {
        code: CONSTANT.STATUS_CODE.SERVER_ERROR,
        message: 'data is null or missing required properties',
        responsedAt: new Date(),
      }
    }
    return {
      code: CONSTANT.STATUS_CODE.SUCCESS,
      data: {
        name: data.name
      },
      responsedAt: new Date()
    }
  }
}
