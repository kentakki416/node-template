import mongoose, { Model, Document} from "mongoose"
import IDBClient from "../db_client"

interface Models {
  [key: string]: Model<Document>
}

export class MongoClient implements IDBClient<Document> {
  private models: Models
  
  public constructor(models: Models) {
    this.models = models
  }
  public async connect() {
    try {
      await mongoose.connect('mongodb://localhost:27017/my_database')
      console.log('MongoDB is connected!!!!')
    } catch (err) {
      console.log(err)
    }
  }

  public async disconnect() {
    try {
      await mongoose.disconnect()
      console.log('MongoDB is connected!!!!')
    } catch (err) {
      console.log(err)
    }
  }

  public async insert(modelName: string, params: any) {
    const model = this.models[modelName]
    if (!model) {
      throw new Error(`Model ${modelName} is not found`)
    }
    await model.create(params)
  }

  public async findOne(modelName: string, condition: any): Promise<Document|null>{
    const model = this.models[modelName]
    if (!model) {
      throw new Error(`Model ${modelName} is not found`)
    }
    return await model.findById(condition).exec()
  }
}
