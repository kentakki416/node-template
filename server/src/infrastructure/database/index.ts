import type { MongoDocuments } from '../../types/db'

export interface IDBClient {
  connect(): Promise<void>
  disconnect(): Promise<void>
  insert(modelName: string, params: unknown): Promise<MongoDocuments>
  findById(modelName: string, id: number): Promise<MongoDocuments|null>
  findOne(modelName: string, projection: object): Promise<MongoDocuments|null>
}
