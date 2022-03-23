import { ICreateRentalDTO } from '@module/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@module/rentals/repositories/IRentalsRepository';
import { getRepository, Repository } from 'typeorm';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string) {
    const car = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return car;
  }

  async findOpenRentalByUser(user_id: string) {
    const car = await this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return car;
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total,
  }: ICreateRentalDTO) {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total,
    });

    this.repository.save(rental);
    return rental;
  }

  async findById(id: string) {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findByUser(user_id: string) {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });
    return rentals;
  }
}

export { RentalsRepository };
