import { Injectable } from '@nestjs/common';
import { CreateInterviewDTO } from './dto/createInterview.dto';
import { EntityRepository } from '@mikro-orm/core';
import { Interview } from '../entities/interview';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Interviewer } from '../entities/interviewer';
import { Reviewer } from '../entities/reviewer';
import { InterviewDetailDTO } from './dto/interviewDetail.dto ';
import { CreateInterviewContentDTO } from './dto/createInterviewContent.dto';
import { InterviewContents } from '../entities/interviewContents';
import { InterviewContentDTO } from './dto/interviewContent.dto';
import { InterviewDTO } from './dto/interview.dto';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: EntityRepository<Interview>,
    @InjectRepository(Interviewer)
    private readonly interviewerRepository: EntityRepository<Interview>,
    @InjectRepository(Reviewer)
    private readonly reviewerRepository: EntityRepository<Interview>,
    @InjectRepository(InterviewContents)
    private readonly interviewContentsRepository: EntityRepository<InterviewContents>,
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

    return InterviewDTO.fromEntity(newEntity);
  }

  async createContents(interviewId: bigint, dto: CreateInterviewContentDTO) {
    const interview = await this.interviewRepository.findOneOrFail({
      id: interviewId,
    });

    const newEntity = this.interviewContentsRepository.create({
      interview,
      content: dto.content,
      speaker: 'user',
    });
    await this.interviewContentsRepository
      .getEntityManager()
      .persistAndFlush(newEntity);

    // 이거 가지고 요청해서 응답 생성

    const responseEntity = await this.getResponseByAI(interviewId);
    await this.interviewContentsRepository
      .getEntityManager()
      .persistAndFlush(responseEntity);

    return InterviewContentDTO.fromEntity(responseEntity);
  }

  async findAll() {
    const interviewes = await this.interviewRepository.findAll();

    return interviewes.map(InterviewDTO.fromEntity);
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

  async findContents(interviewId: bigint) {
    const interviewList = await this.interviewContentsRepository.findAll({
      where: {
        interview: { id: interviewId },
      },
    });

    return interviewList.map(InterviewContentDTO.fromEntity);
  }

  private async getResponseByAI(interviewId: bigint) {
    const answerCount = await this.interviewContentsRepository.count({
      interview: { id: interviewId },
      speaker: 'user',
    });

    if (answerCount > 10) {
      return this.interviewContentsRepository.create({
        interview: { id: interviewId },
        speaker: 'bot',
        content: '수고하셨습니다',
      });
    }

    // 응답 받아서 처리하는 로직
    return this.interviewContentsRepository.create({
      interview: { id: interviewId },
      speaker: 'bot',
      content: '응답을 합니다.',
    });
  }
}
