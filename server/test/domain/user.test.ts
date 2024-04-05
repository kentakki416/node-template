import { UserBusinessRule } from '../../src/domain' 

describe(__filename, () => {
  describe('ユーザー名の文字数のチェック', () => {
    it('ユーザー名が1~9文字の場合、trueを返す', () => {
      const name = 'Taro'
      expect(UserBusinessRule.checkNameLength(name)).toBe(true)
    })
    it('ユーザー名が0文字の場合、falseを返す', () => {
      const name = ''
      expect(UserBusinessRule.checkNameLength(name)).toBe(false)
    })
    it('ユーザー名が10文字の場合、falseを返す', () => {
      const name = '1234567890'
      expect(UserBusinessRule.checkNameLength(name)).toBe(false)
    })
    it('ユーザー名が11文字（10文字以上）の場合、falseを返す', () => {
      const name = '12345678901'
      expect(UserBusinessRule.checkNameLength(name)).toBe(false)
    })  
  })
})
