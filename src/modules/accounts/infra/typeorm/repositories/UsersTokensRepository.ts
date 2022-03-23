import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@module/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@module/accounts/repositories/IUsersTokensRepository';
import { UserTokens } from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO) {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string) {
    const usersTokens = await this.repository.findOne({
      user_id,
      refresh_token,
    });

    return usersTokens;
  }

  async deleteById(id: string) {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string) {
    const userToken = await this.repository.findOne({ refresh_token });
    return userToken;
  }
}

export { UsersTokensRepository };
