import type { User } from "../../../domain"
import type { Response } from "../"
import type { UserResponseData } from "./user_serialize"

export * from "./user_serialize"

export interface IUserSerialize {
  serialize(data: User): Response<UserResponseData>
}
