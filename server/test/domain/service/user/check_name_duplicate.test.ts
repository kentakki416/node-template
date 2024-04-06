import { User } from '../../../../src/domain/entity/user'
import { UserDomainService } from '../../../../src/domain/service/user/check_name_duplicate'
import { InMemoryUserRepository } from '../../../../src/infrastructure/database/inMemory/user_repository'

describe(__filename, () => {
  let repository: InMemoryUserRepository
  let domainService: UserDomainService

  beforeAll(() => {
    // テスト前に初期化する
    repository = new InMemoryUserRepository()
    domainService = new UserDomainService(repository)
  })

  afterEach(() => {
    // データベースの初期化
    repository.refresh()
  })

  test('DBにユーザー名がない場合、falseを返す', async () => {
    const name = 'Taro'
    const result = await domainService.isDupicateName(name)
    expect(result).toBeFalsy()
  })

  test('ユーザー名に重複がある場合、trueを返す', async () => {
    const name = 'Taro'
    const user = new User(name)

    // データベースに保存
    await repository.save(user)

    const result = await domainService.isDupicateName(name)
    expect(result).toBeFalsy()
  })

  test('ユーザー名に重複がない場合、falseを返す', async () => {
    const existName = 'Kenta'
    const user = new User(existName)

    await repository.save(user)
    const newName = 'Taro'
    const result = await domainService.isDupicateName(newName)
    expect(result).toBeTruthy()
  })
})
