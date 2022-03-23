import { getRepository, Repository } from 'typeorm';

import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from '@module/cars/repositories/ISpecificationsRepository';
import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO) {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string) {
    const specification = this.repository.findOne({ name });
    return specification;
  }

  async findByIds(ids: string[]) {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
}

export { SpecificationsRepository };
