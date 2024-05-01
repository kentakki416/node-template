export class User {
  private readonly _id: number
  private _name: string

  constructor(name: string) {
    if (!UserBusinessRule.checkNameLength(name)) {
      throw new Error('User name is invalid')
    }

    this._id = Math.floor(Math.random() * Math.floor(1000))
    this._name = name
  }

  get id (): number {
    return this._id
  }

  get name (): string {
    return this._name
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

/**
 * DomainServiceに追加のビジネスルールあり
 * 1. 名前は一意でなけれなない
 */
export const UserBusinessRule = {
  /**
   * 名前は一文字以上、2０文字未満
   */
  checkNameLength(name: string) {
    return name.length > 0 && name.length < 20
  }
}
