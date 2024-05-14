import { UserCreateSerializer } from '../../../../src/adapter/serializer/user/user_create_serializer'
import CONSTANT from '../../../../src/constant'
import { User } from '../../../../src/domain/entity/user'

describe(__filename, () => {
  let userCreateSerializer: UserCreateSerializer

  beforeEach(() => {
    userCreateSerializer = new UserCreateSerializer()
  })

  it('正常にレスポンスデータをリターンできる', () => {
    expect.assertions(3)
    const user = new User('Test User')
    const response = userCreateSerializer.execute(user)
    if ('data' in response) {
      expect(response.code).toEqual(CONSTANT.STATUS_CODE.SUCCESS)
      expect(response.data).toEqual({
        name: user.name,
      })
      expect(response.responsedAt).toBeInstanceOf(Date)
    }
  })
  it('dataがnullの場合、dataがないことをクライアントに返す', () => {
    const response = userCreateSerializer.execute({} as User)
    if ('message' in response) {
      expect(response.code).toEqual(CONSTANT.STATUS_CODE.SERVER_ERROR)
      expect(response.message).toEqual('data is null')
      expect(response.responsedAt).toBeInstanceOf(Date)
    }
  })
})
