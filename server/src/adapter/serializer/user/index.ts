import type { User } from '../../../domain'
import type { Response } from '../base_serialize'
import type { UserResponseData } from './create_user_serialize'

export * from './create_user_serialize'

export interface IUserSerialize {
  serialize(data: User):Response<UserResponseData>
}
