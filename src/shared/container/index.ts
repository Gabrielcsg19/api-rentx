import { container } from 'tsyringe';

import '@shared/container/providers';

import { IUsersRepository } from '@module/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '@module/cars/repositories/ICategoriesRepository';
import { UsersRepository } from '@module/accounts/infra/typeorm/repositories/UsersRepository';
import { CategoriesRepository } from '@module/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@module/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsRepository } from '@module/cars/repositories/ICarsRepository';
import { CarsRepository } from '@module/cars/infra/typeorm/repositories/CarsRepository';
import { ICarsImagesRepository } from '@module/cars/repositories/ICarsImagesRepository';
import { CarsImagesRepository } from '@module/cars/infra/typeorm/repositories/CarsImagesRepository';
import { IRentalsRepository } from '@module/rentals/repositories/IRentalsRepository';
import { RentalsRepository } from '@module/rentals/infra/typeorm/repositories/RentalsRepository';
import { IUsersTokensRepository } from '@module/accounts/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@module/accounts/infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<SpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository,
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
