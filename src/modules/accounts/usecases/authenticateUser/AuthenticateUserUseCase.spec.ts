import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO"
import { AppError } from "@shared/errors/AppError"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    const user:  ICreateUsersDTO = {
      driver_license: '123',
      name: 'test',
      email: 'text@gmail.com',
      password: '12345678'
    }
    await createUserUseCase.execute(user)
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })
    expect(result).toHaveProperty("token")

  })

  it("should not be able to authenticate an non exist user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@gmail.com',
        password: '12345678'
      })
    }).rejects.toBeInstanceOf(AppError)

  })

  it("should not be able to authenticate an non exist user", () => {
    
    expect(async () => {
      const user:  ICreateUsersDTO = {
        driver_license: '123',
        name: 'user test error ',
        email: 'text@gmail.com',
        password: '12345678'
      }
      await createUserUseCase.execute(user)
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password'
      })
    }).rejects.toBeInstanceOf(AppError)

  })
}) 