import { ICreateUserTokenDTO } from '@module/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@module/accounts/infra/typeorm/entities/UserTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO) {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string) {
    const userToken = this.usersTokens.find(
      (userToken) =>
        userToken.id === user_id && userToken.refresh_token === refresh_token,
    );

    return userToken;
  }

  async deleteById(id: string) {
    this.usersTokens.filter((userToken) => userToken.id !== id);
  }

  async findByRefreshToken(refresh_token: string) {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token,
    );
    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
