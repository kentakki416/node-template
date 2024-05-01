import { User } from '../../../src/domain/entity/user'

describe(__filename, () => {

  describe('インスタンス化', () => {

    describe('ユーザーEntityを作成できる', () => {
      it('ユーザー名が1~19文字＆他のユーザーと重複していない場合、Entityを作成できる', () => {
        const name = 'Taro'
        const user = new User(name)
        expect(user.name).toBe(name)
      })
    })

    describe('ユーザーEntityを作成できない', () => {
      it('ユーザー名が0文字の場合、エラーを投げる', () => {
        const invalidName = ''
        expect(() => new User(invalidName)).toThrow('User name is invalid')
      })
      it('ユーザー名が20文字の場合、エラーを投げる', () => {
        const invalidName = 'aaaaaaaaaaaaaaaaaaaa'
        expect(() => new User(invalidName)).toThrow('User name is invalid')
      })
      it('ユーザー名が21文字（20文字以上）の場合、エラー投げる', () => {
        const invalidName = 'aaaaaaaaaaaaaaaaaaaaa'
        expect(() => new User(invalidName)).toThrow('User name is invalid')
      })
    })
  })
})
