import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Reviewer } from '../entities/reviewer';

@Injectable()
export class ReviewersService {
  constructor(
    @InjectRepository(Reviewer)
    private readonly reviewerRepository: EntityRepository<Reviewer>,
  ) {}

  getAll() {
    return this.reviewerRepository.findAll();
  }
}
