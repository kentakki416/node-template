import { schemas as getUserSchema } from './get_user_schema'
import { schemas as postUserSchema } from './post_user_schema'

export const userSchemas = {
  ...getUserSchema,
  ...postUserSchema,
}
