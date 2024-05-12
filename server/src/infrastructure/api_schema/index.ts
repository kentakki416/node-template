/**
 * middleware/http_validte.tsで使用するHTTPリクエストのバリデーションスキーマ
 */
import { userSchemas } from './user'

export const allSchema = {
  ...userSchemas
}

export type Route = keyof typeof allSchema
