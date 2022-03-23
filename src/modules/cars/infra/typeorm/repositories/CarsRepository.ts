import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@module/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@module/cars/repositories/ICarsRepository';
import { IFindAvailableCarsDTO } from '@module/cars/dtos/IFindAvailableCarsDTO';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id,
  }: ICreateCarDTO) {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string) {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  async findAvailable({ brand, category_id, name }: IFindAvailableCarsDTO) {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }

    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(id: string) {
    const car = await this.repository.findOne(id);
    return car;
  }

  async updateAvailable(id: string, available: boolean) {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
