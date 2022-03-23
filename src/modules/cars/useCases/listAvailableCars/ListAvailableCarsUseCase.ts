import { IFindAvailableCarsDTO } from '@module/cars/dtos/IFindAvailableCarsDTO';
import { ICarsRepository } from '@module/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute(findBy?: IFindAvailableCarsDTO) {
    const cars = await this.carsRepository.findAvailable(findBy);
    return cars;
  }
}

export { ListAvailableCarsUseCase };
