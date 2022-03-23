import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@module/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { IRentalsRepository } from '@module/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    const minDaily = 1;

    if (!rental) {
      throw new AppError('Rental does not exists!');
    }

    const dateNow = this.dateProvider.dateNow();

    let dailyCount = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow,
    );

    if (dailyCount <= 0) {
      dailyCount = minDaily;
    }

    const daysDelayCount = this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow,
    );

    let rentalTotalAmount = 0;

    if (daysDelayCount > 0) {
      const calculateFine = daysDelayCount * car.fine_amount;
      rentalTotalAmount = calculateFine;
    }

    rentalTotalAmount += dailyCount * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = rentalTotalAmount;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
