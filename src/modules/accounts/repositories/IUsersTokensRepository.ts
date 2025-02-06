import { ICreateUsersTokensDTO } from "../dtos/ICreateUsersTokensDTO";
import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokensRepository {
    create({expires_date, refresh_token, user_id}: ICreateUsersTokensDTO): Promise<UsersTokens> 
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens | undefined>
    deleteById(id: string): Promise<void>
    findByRefreshToken(refresh_token: string): Promise<UsersTokens | undefined>
}

export {IUsersTokensRepository}