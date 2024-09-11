import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Reviewer } from '../entities/reviewer';
import { ReviewerDTO } from './dto/reviwer.dto';

@Injectable()
export class ReviewersService {
  constructor(
    @InjectRepository(Reviewer)
    private readonly reviewerRepository: EntityRepository<Reviewer>,
  ) {}

  async getAll() {
    const reviewers = await this.reviewerRepository.findAll();

    return reviewers.map(ReviewerDTO.fromEntity);
  }
}
