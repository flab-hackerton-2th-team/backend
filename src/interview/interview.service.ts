import { Injectable } from '@nestjs/common';
import { CreateInterviewDTO } from './dto/createInterview.dto';
import { EntityRepository } from '@mikro-orm/core';
import { Interview } from '../entities/interview';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Interviewer } from '../entities/interviewer';
import { Reviewer } from '../entities/reviewer';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: EntityRepository<Interview>,
    @InjectRepository(Interviewer)
    private readonly interviewerRepository: EntityRepository<Interview>,
    @InjectRepository(Reviewer)
    private readonly reviewerRepository: EntityRepository<Interview>,
  ) {}

  async create(createDTO: CreateInterviewDTO) {
    const [interviewer, reviewer] = await Promise.all([
      this.interviewerRepository.findOneOrFail({
        id: createDTO.interviewerId,
      }),
      this.reviewerRepository.findOneOrFail({
        id: createDTO.reviewerId,
      }),
    ]);

    const newEntity = this.interviewRepository.create({
      title: 'test',
      status: 'created',
      interviewer,
      reviewer,
    });

    await this.interviewerRepository
      .getEntityManager()
      .persistAndFlush(newEntity);

    return newEntity;
  }

  findAll() {
    return this.interviewRepository.findAll();
  }

  findOne(id: bigint) {
    throw new Error('Method not implemented.');
  }
}
