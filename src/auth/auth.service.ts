import { Injectable } from '@nestjs/common';
import { CreateInterviewerDTO } from './dto/createInterviewer.dto';
import { Interviewer } from '../entities/interviewer';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { InterviewerDTO } from './dto/Interviewer.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Interviewer)
    private readonly interviewerRepository: EntityRepository<Interviewer>,
  ) {}

  async createInterviewer(createDTO: CreateInterviewerDTO) {
    const interviewer = await this.interviewerRepository.create(createDTO);

    await this.interviewerRepository
      .getEntityManager()
      .persistAndFlush(interviewer);

    return InterviewerDTO.fromEntity(interviewer);
  }
}
