import { ICreateCarDTO } from '@module/cars/dtos/ICreateCarDTO';
import { IFindAvailableCarsDTO } from '@module/cars/dtos/IFindAvailableCarsDTO';
import { Car } from '@module/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
    id,
  }: ICreateCarDTO) {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string) {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable({
    brand,
    category_id,
    name,
  }: IFindAvailableCarsDTO): Promise<Car[]> {
    const cars = this.cars.filter(
      (car) =>
        car.available ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name),
    );
    return cars;
  }

  async findById(id: string) {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(id: string, available: boolean) {
    const requestedCarIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[requestedCarIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
