import { model, Schema } from 'mongoose'

import type { UserCollection } from '../../../../types/db'

const schema = new Schema<UserCollection>({
  name: {
    type: String,
    required: [true, 'name should not be empty!'],
  }
}, { timestamps: true })

export const UserModel = model<UserCollection>('User', schema)
