// // import mongoose, { Model } from 'mongoose'

// // import { UserModel } from './models'
// // import { IDBClient } from '..'
// import type { Collections } from '../../../types/db'
// import type { ILogger } from '../../log/i_logger'

// // type ModelMap = {
// //   [K in keyof Collections]: Model<Collections[K]>
// // }

// export class MongoClient {
//   private _logger: ILogger
//   // private _models: ModelMap

//   public constructor(logger: ILogger) {
//     this._logger = logger
//     // this._models = {
//     //   User: UserModel,
//     // }
//   }

//   public async connect(): Promise<void> {
//     try {
//       await mongoose.connect('mongodb://localhost:27017/my_database')
//       this._logger.info('mongo client is connected!!!')
//     } catch (err) {
//       this._logger.error(err as Error)
//       throw new Error((err as Error).message)
//     }
//   }

//   public async disconnect(): Promise<void> {
//     try {
//       await mongoose.disconnect()
//       this._logger.info('mongo client is disconnected!!!')
//     } catch (err) {
//       this._logger.error(err as Error)
//       throw new Error((err as Error).message)
//     }
//   }

//   // public async insert<T extends keyof ModelMap>(modelName: T, params: Collections[T]): Promise<Collections[T]> {
//   //   try {
//   //     const model = this._models[modelName]
//   //     if (!model) {
//   //       throw new Error(`Model ${modelName} is not found`)
//   //     }
//   //     return await model.create(params)
//   //   } catch (err) {
//   //     this._logger.error(err as Error)
//   //     throw new Error((err as Error).message)
//   //   }
//   // }

//   // public async findById<T extends keyof ModelMap>(modelName: T, id: number): Promise<Collections[T]|null> {
//   //   try {
//   //     const model = this._models[modelName]
//   //     if (!model) {
//   //       throw new Error(`Model ${modelName} is not found`)
//   //     }
//   //     return await model.findById(id).exec()
//   //   } catch (err) {
//   //     this._logger.error(err as Error)
//   //     throw new Error((err as Error).message)
//   //   }
//   // }

//   // public async findOne<T extends keyof ModelMap>(modelName: T, projection: object): Promise<Collections[T]|null> {
//   //   try {
//   //     const model = this._models[modelName]
//   //     if (!model) {
//   //       throw new Error(`Model ${modelName} is not found`)
//   //     }
//   //     return await model.findOne(projection)
//   //   } catch (err) {
//   //     this._logger.error(err as Error)
//   //     throw new Error((err as Error).message)
//   //   }
//   // }
// }
