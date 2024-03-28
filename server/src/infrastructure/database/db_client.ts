export interface IDBClient {
  connect(): Promise<void>
  disconnect(): Promise<void>
  insert(modelName: string, params: any): Promise<any>
  findOne(modelName: string, condition: any): Promise<any|null>
}
