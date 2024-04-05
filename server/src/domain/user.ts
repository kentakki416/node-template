export class User {
  private readonly _id: number
  private _name: string
  private readonly _created_at: number
  private _updated_at: number

  constructor(name: string, existName?: string) {
    if (UserBusinessRule.checkNameLength(name)) {
      throw new Error('User name is required')
    }

    if (UserBusinessRule.checkNameDuplicate(name, existName)) {
      throw new Error('User name is Duplidate')
    }
    
    this._id = Math.floor(Math.random() * Math.floor(1000))
    this._name = name
    this._created_at = Date.now()
    this._updated_at = Date.now()
  }

  get id (): number {
    return this._id
  }

  get name (): string {
    return this._name
  }

  get created_at (): number {
    return this._created_at
  }

  get updated_at (): number {
    return this._updated_at
  }

  // private setName (name: string, exsitName?: string) {
  //   if (!UserBusinessRule.checkNameLength(name)) {
  //     throw new Error('Invalid name Lenghth')
  //   }
  //   if (!UserBusinessRule.checkNameDuplicate(name, exsitName)) {
  //     throw new Error('Invalid Duplicate name')
  //   }
  //   this._name = name
  // }
}

export const UserBusinessRule = {
  /**
   * 名前は一文字以上、１０文字未満
   */
  checkNameLength(name: string) {
    return name.length > 0 && name.length < 10
  },

  /**
   * 名前は一意でなければならない
   */
  checkNameDuplicate(name: string, exsitName?: string) {
    return exsitName ? exsitName !== name : true
  },
}
