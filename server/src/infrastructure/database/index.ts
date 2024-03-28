import type { MongoDocuments } from "../../types/db"

export interface IDBClient {
  connect(): Promise<void>
  disconnect(): Promise<void>
  insert(modelName: string, params: unknown): Promise<MongoDocuments>
  findOne(modelName: string, condition: unknown): Promise<MongoDocuments|null>
}
