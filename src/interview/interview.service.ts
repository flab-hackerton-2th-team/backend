import { Injectable } from '@nestjs/common';
import { CreateInterviewDTO } from './dto/createInterview.dto';
import { EntityRepository } from '@mikro-orm/core';
import { Interview } from '../entities/interview';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Interviewer } from '../entities/interviewer';
import { Reviewer } from '../entities/reviewer';
import { InterviewDetailDTO } from './dto/interviewDetail.dto ';

@Injectable()
export class InterviewService {
  createContents(id: bigint, arg1: any) {
    throw new Error('Method not implemented.');
  }
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

  async findOne(id: bigint) {
    const interview = await this.interviewRepository.findOne(
      { id },
      {
        populate: ['contents'],
      },
    );

    return InterviewDetailDTO.fromEntity(interview);
  }
}
