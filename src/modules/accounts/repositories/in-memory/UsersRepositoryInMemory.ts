import { ICreateUserDTO } from '@module/accounts/dtos/ICreateUserDTO';
import { User } from '@module/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ driver_license, email, name, password }: ICreateUserDTO) {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
