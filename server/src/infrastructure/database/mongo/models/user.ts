import {model, Schema} from 'mongoose'

interface User {
  _id: string,
  name: string,
}

const schema = new Schema<User>({
  _id: {type: String},
  name: {
    type: String,
    required: [true, "name should not be empty!"],
  }
}, {timestamps: true})

export const UserModel = model<User>('User', schema)
