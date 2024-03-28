export * from "./user"

import CONSTANT from "../../constant"

export type Response<T> = {
  code: typeof CONSTANT.STATUS_CODE.SUCCESS
  data: T
  responsedAt: Date
} | {
  code: 
  | typeof CONSTANT.STATUS_CODE.BAD_REQUEST 
  | typeof CONSTANT.STATUS_CODE.NOT_FOUND 
  | typeof CONSTANT.STATUS_CODE.SERVER_ERROR
  message: string
  responsedAt: Date
}

export class BaseSerialize {
  public error(error: Error): Response<{}> {
    try {
      const err = JSON.parse(error.message)
      return {
        code : err.code,
        message: err.message,
        responsedAt: new Date(),
      }
    } catch {
      return {
        code: CONSTANT.STATUS_CODE.SERVER_ERROR,
        message: "err boj parse error",
        responsedAt: new Date()
      }
    }
  }
}
