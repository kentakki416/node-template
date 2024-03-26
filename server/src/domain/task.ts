import * as App from '../type/application'

export class Task {
  private readonly _id: number
  private _title: string
  private _status: App.Task.StatusType
  private _content: string
  private _expire: number
  private readonly _created_at: number
  private _updated_at: number

  constructor(title: string, status: App.Task.StatusType, content: string, expire: number) {
    if (!title) {
      throw new Error('Title is required');
    }
    if (content.length > 100) {
      throw new Error('Content should be less than 100 characters');
    }
    this._id = Math.floor(Math.random() * Math.floor(1000));
    this._title = title;
    this._status = status;
    this._content = content;
    this._expire = expire;
    this._created_at = Date.now();
    this._updated_at = Date.now();
  }

  get id () {
    return this._id;
  }

  get title () {
    return this._title;
  }

  get status () {
    return this._status;
  }

  get content () {
    return this._content;
  }

  get expire () {
    return this._expire;
  }

  get created_at () {
    return this._created_at;
  }

  get updated_at () {
    return this._updated_at;
  }
}
