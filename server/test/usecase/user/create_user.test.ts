import { User } from '../../../src/domain/entity/user'
import { InMemoryUserRepository } from '../../../src/infrastructure/database/inMemory/user_repository'
import { CreateUserUsecase } from '../../../src/usecase/user/create_user'

describe(__filename, () => {
  let repository: InMemoryUserRepository
  let usecase: CreateUserUsecase

  beforeAll(() => {
    repository = new InMemoryUserRepository()
    usecase = new CreateUserUsecase(repository)
  })

  test('ユーザー名の重複があった場合、エラーを返す', async () => {
    const testCase = { name: 'DuplicateName' }
    const existUser = new User(testCase.name)
    await repository.save(existUser)

    await expect(usecase.execute(testCase)).rejects.toThrow('User name is Duplicate')
  })

  test('ユーザー名の重複がない場合、ユーザーを登録できる', async () => {
    const testCase = { name: 'UniqueName' }
    await expect(usecase.execute(testCase)).resolves.not.toThrow()
    const savedUser = await repository.findOne(testCase.name)
    expect(savedUser).not.toBeNull()
    expect(savedUser?.name).toBe(testCase.name)
  })
})
