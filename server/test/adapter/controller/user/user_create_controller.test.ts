import { UserCreateController } from '../../../../src/adapter/controller/user/user_create_controller'
import { User } from '../../../../src/domain/entity/user'
import { ConsoleLogger } from '../../../../src/infrastructure/log/console_logging'
import type { ILogger } from '../../../../src/infrastructure/log/i_logger'
import { RequestCreateUser, CreateUserUsecase } from '../../../../src/usecase/user/create_user'
import { UserCreateSerializer } from '../../../../src/adapter/serializer/user/user_create_serializer'
import { InMemoryUserRepository } from '../../../../src/infrastructure/database/inMemory/user_repository'
import type CONSTANT from '../../../../src/constant'

jest.mock('../../../../src/usecase/user/create_user')
jest.mock('../../../../src/adapter/serializer/user/user_create_serializer')

describe(__filename, () => {
  let logger: ILogger
  let controller: UserCreateController
  let repo: InMemoryUserRepository
  let mockCreateuserUsecase: jest.Mocked<CreateUserUsecase>
  let mockUserCreateSerializer: jest.Mocked<UserCreateSerializer>

  beforeEach(() => {
    logger = new ConsoleLogger()
    repo = new InMemoryUserRepository()
    mockCreateuserUsecase = new CreateUserUsecase(repo) as jest.Mocked<CreateUserUsecase>
    mockUserCreateSerializer = new UserCreateSerializer() as jest.Mocked<UserCreateSerializer>
    controller = new UserCreateController(mockUserCreateSerializer, mockCreateuserUsecase, logger)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('ユーザーが作成できる', async () => {
    const mockUser = new User('Mock User')
    const request: RequestCreateUser = {
      name: mockUser.name
    }

    mockCreateuserUsecase.execute.mockResolvedValue(mockUser)
    mockUserCreateSerializer.execute.mockReturnValue({
      code: 200,
      data: {
        id: mockUser.id,
        name: mockUser.name
      },
      responsedAt: new Date()
    })

    const result = await controller.execute(request)

    expect(mockCreateuserUsecase.execute).toHaveBeenCalledWith(request)
    expect(mockUserCreateSerializer.execute).toHaveBeenCalledWith(mockUser)
    expect(result).toEqual(mockUserCreateSerializer.execute(mockUser))
  })

  it('ユースケースでエラーが発生する', async() => {
    const mockUser = new User('Mock User')
    const request: RequestCreateUser = {
      name: mockUser.name
    }
    const mockError = new Error('Create User Usecase Error')
    const mockErrorResponse = {
      code: 500 as typeof CONSTANT.STATUS_CODE.SERVER_ERROR,
      message: mockError.message,
      responsedAt: new Date()
    }
    mockCreateuserUsecase.execute.mockRejectedValue(mockError)
    mockUserCreateSerializer.error.mockReturnValue(mockErrorResponse)

    const result = await controller.execute(request)
    
    expect(mockCreateuserUsecase.execute).toHaveBeenCalledWith(request)
    expect(mockUserCreateSerializer.error).toHaveBeenCalledWith(mockError)
    expect(result).toEqual(mockErrorResponse)
  })
})
