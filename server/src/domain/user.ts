export class User {
  private readonly _id: number
  private _name: string
  private readonly _created_at: number
  private _updated_at: number

  constructor(name: string) {
    if (!name) {
      throw new Error('User name is required');
    }
    if (name.length > 10) {
      throw new Error('User name is limit 10 character')
    }
    
    this._id = Math.floor(Math.random() * Math.floor(1000));
    this._name = name;
    this._created_at = Date.now();
    this._updated_at = Date.now();
  }

  get id () {
    return this._id;
  }

  get name () {
    return this._name;
  }

  get created_at () {
    return this._created_at;
  }

  get updated_at () {
    return this._updated_at;
  }
}
