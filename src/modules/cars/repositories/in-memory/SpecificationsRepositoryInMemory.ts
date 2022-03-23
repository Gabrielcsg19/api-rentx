import { Specification } from '@module/cars/infra/typeorm/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO) {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string) {
    return this.specifications.find(
      (specification) => specification.name === name,
    );
  }

  async findByIds(ids: string[]) {
    const specifications = this.specifications.filter((specification) =>
      ids.includes(specification.id),
    );

    return specifications;
  }
}

export { SpecificationsRepositoryInMemory };
