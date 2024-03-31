import mongoose, { Model } from 'mongoose'

import { UserModel } from './models'
import { IDBClient } from '../'
import type { Collections } from '../../../types/db'


type ModelMap = {
  [K in keyof Collections]: Model<Collections[K]>
}

export class MongoClient implements IDBClient {
  private models: ModelMap
  
  public constructor() {
    this.models = {
      User: UserModel,
    }
  }
  
  public async connect(): Promise<void> {
    try {
      await mongoose.connect('mongodb://localhost:27017/my_database')
      // console.log("MongoDB is connected!!!!")
    } catch (err) {
      // console.log(err)
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect()
      // console.log("MongoDB is connected!!!!")
    } catch (err) {
      // console.log(err)
    }
  }

  public async insert<T extends keyof ModelMap>(modelName: T, params: Collections[T]): Promise<Collections[T]> {
    const model = this.models[modelName]
    if (!model) {
      throw new Error(`Model ${modelName} is not found`)
    }
    return await model.create(params)
  }

  public async findOne<T extends keyof ModelMap>(modelName: T, id: number): Promise<Collections[T]|null> {
    const model = this.models[modelName]
    if (!model) {
      throw new Error(`Model ${modelName} is not found`)
    }
    return await model.findById(id).exec()
  }
}
