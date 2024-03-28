import mongoose, { Model} from "mongoose"
import IDBClient from "../db_client"
import {User} from '../../../domain'
import { UserModel } from "./models/user"

interface Models {
  [key: string]: Model<any>
}

export class MongoClient implements IDBClient {
  private models: Models
  
  public constructor() {
    this.models = {
      'User': UserModel,
    }
  }
  
  public async connect(): Promise<void> {
    try {
      await mongoose.connect('mongodb://localhost:27017/my_database')
      console.log('MongoDB is connected!!!!')
    } catch (err) {
      console.log(err)
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect()
      console.log('MongoDB is connected!!!!')
    } catch (err) {
      console.log(err)
    }
  }

  public async insert(modelName: string, params: User): Promise<any> {
    const model = this.models[modelName]
    if (!model) {
      throw new Error(`Model ${modelName} is not found`)
    }
    return await model.create(params)
  }

  public async findOne(modelName: string): Promise<any|null>{
    const model = this.models[modelName]
    if (!model) {
      throw new Error(`Model ${modelName} is not found`)
    }
    return await model.findOne().exec()
  }
}
