import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@module/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@module/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password, driver_license }: ICreateUserDTO) {
    const userAlreadyExits = await this.usersRepository.findByEmail(email);

    if (userAlreadyExits) {
      throw new AppError('User already exists!');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
