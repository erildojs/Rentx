import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization
  if(!authHeader) {
    throw new AppError('token missing!', 401)
  }
  const [, token] = authHeader.split(' ')

  try {
    const {sub: user_id} = verify(token, '91a809914309f4b5d11cc1c0a1749c39') as IPayload
    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)
    if(!user) {
      throw new AppError('Users does not exists!', 401)
    }
    request.user = {
      id: user_id
    }
    next()
  } catch (error) {
    throw new AppError('invalid token!', 401)
  }
} 