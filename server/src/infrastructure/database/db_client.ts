export default interface IDBClient<T> {
  connect(): Promise<void>
  disconnect(): Promise<void>
  insert(modelName: string, params: any): Promise<void>
  findOne(modelName: string, condition: any): Promise<T|null>
}
