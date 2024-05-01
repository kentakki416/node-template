import { User } from '../../../src/domain/entity/user'
import { InMemoryUserRepository } from '../../../src/infrastructure/database/inMemory/user_repository'
import { ReadUserUsecase } from '../../../src/usecase/user/find_user'

describe(__filename, () => {
  let repository: InMemoryUserRepository
  let usecase: ReadUserUsecase

  beforeEach(() => {
    repository = new InMemoryUserRepository()
    usecase = new ReadUserUsecase(repository)
  })

  test('ユーザーが存在する場合、ユーザーEntityを返す', async () => {
    const user = new User('ExistingUser')
    await repository.save(user)

    const result = await usecase.execute({ id: user.id })

    expect(result).not.toBeNull()
    expect(result?.name).toBe('ExistingUser')
  })

  test('ユーザーが存在しない場合、nullを返す', async () => {
    const result = await usecase.execute({ id: 9999 }) // Assuming this ID does not exist
    expect(result).toBeNull()
  })
})
