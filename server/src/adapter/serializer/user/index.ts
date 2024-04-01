import type { UserResponseData } from './user_serialize'
import type { Response } from '../'
import type { User } from '../../../domain'

export * from './user_serialize'

export interface IUserSerialize {
  serialize(data: User): Response<UserResponseData>
}
