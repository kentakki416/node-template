import { UserCreateController } from '../../../../src/adapter/controller/user/user_create_controller'
import { User } from '../../../../src/domain/entity/user'
import { ConsoleLogger } from '../../../../src/infrastructure/log/console_logging'
import type { ILogger } from '../../../../src/infrastructure/log/i_logger'
import { RequestCreateUser, CreateUserUsecase } from '../../../../src/usecase/user/create_user'
import { UserSerializer } from '../../../../src/adapter/serializer/user/user_serialize'
import { InMemoryUserRepository } from '../../../../src/infrastructure/database/inMemory/user_repository'
import type CONSTANT from '../../../../src/constant'

jest.mock('../../../../src/usecase/user/create_user')
jest.mock('../../../../src/adapter/serializer/user/user_serialize')

describe(__filename, () => {
  let logger: ILogger
  let controller: UserCreateController
  let repo: InMemoryUserRepository
  let mockCreateuserUsecase: jest.Mocked<CreateUserUsecase>
  let mockUserSerializer: jest.Mocked<UserSerializer>

  beforeEach(() => {
    logger = new ConsoleLogger()
    repo = new InMemoryUserRepository()
    mockCreateuserUsecase = new CreateUserUsecase(repo) as jest.Mocked<CreateUserUsecase>
    mockUserSerializer = new UserSerializer() as jest.Mocked<UserSerializer>
    controller = new UserCreateController(mockUserSerializer, mockCreateuserUsecase, logger)
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
    mockUserSerializer.create.mockReturnValue({
      code: 200,
      data: {
        id: mockUser.id,
        name: mockUser.name
      },
      responsedAt: new Date()
    })

    const result = await controller.execute(request)

    expect(mockCreateuserUsecase.execute).toHaveBeenCalledWith(request)
    expect(mockUserSerializer.create).toHaveBeenCalledWith(mockUser)
    expect(result).toEqual(mockUserSerializer.create(mockUser))
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
    mockUserSerializer.error.mockReturnValue(mockErrorResponse)

    const result = await controller.execute(request)
    
    expect(mockCreateuserUsecase.execute).toHaveBeenCalledWith(request)
    expect(mockUserSerializer.error).toHaveBeenCalledWith(mockError)
    expect(result).toEqual(mockErrorResponse)
  })
})
