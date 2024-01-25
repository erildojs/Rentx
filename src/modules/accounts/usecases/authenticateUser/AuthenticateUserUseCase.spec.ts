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
      email: 'test@gmail.com',
      password: '12345'
    }
    await createUserUseCase.execute(user)
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })
    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate an non exist user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@gmail.com',
        password: '12345'
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"))
  })

  it("should not be able to authenticate with incorrect password", async () => {
      const user:  ICreateUsersDTO = {
        driver_license: '123',
        name: 'user test error ',
        email: 'text@test.com',
        password: '12345'
      }
      await createUserUseCase.execute(user)
      await expect(
        authenticateUserUseCase.execute({
          email: user.email,
          password: 'incorrect password'
        })
      ).rejects.toEqual(new AppError("Email or password incorrect!"))
  })
}) 