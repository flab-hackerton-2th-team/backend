import { Test, TestingModule } from '@nestjs/testing';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { MikroOrmModule, getRepositoryToken } from '@mikro-orm/nestjs';
import { Reviewer } from '../entities/reviewer';
import { testConfig } from '../mikro-orm.config';
import { Interview } from '../entities/interview';
import { Interviewer } from '../entities/interviewer';
import { INTERVIEWER_LIST } from '../../test/fixture/interviewer.common';
import { REVIEWER_LIST } from '../../test/fixture/reviewers.common';
import { plainToInstance } from 'class-transformer';
import { CreateInterviewDTO } from './dto/createInterview.dto';
import { InterviewContents } from '../entities/interviewContents';

describe('InterviewController', () => {
  let controller: InterviewController;
  let reviewerRepository: EntityRepository<Reviewer>;
  let interviewerRepository: EntityRepository<Interviewer>;
  let orm: MikroORM;

  let reviewerList: Reviewer[];
  let interviewerList: Interviewer[];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(testConfig),
        MikroOrmModule.forFeature([
          Reviewer,
          Interviewer,
          Interview,
          InterviewContents,
        ]),
      ],
      providers: [InterviewService],
      controllers: [InterviewController],
    }).compile();

    controller = module.get<InterviewController>(InterviewController);
    reviewerRepository = module.get<EntityRepository<Reviewer>>(
      getRepositoryToken(Reviewer),
    );
    interviewerRepository = module.get<EntityRepository<Interviewer>>(
      getRepositoryToken(Interviewer),
    );
    orm = module.get(MikroORM);
  });

  beforeEach(async () => {
    await orm.getSchemaGenerator().dropSchema();
    await orm.getSchemaGenerator().createSchema();

    await Promise.all(
      REVIEWER_LIST.map((reviewer) => reviewerRepository.create(reviewer)),
    );

    await Promise.all(
      INTERVIEWER_LIST.map((interviewer) =>
        interviewerRepository.create(interviewer),
      ),
    );

    await orm.em.flush();
    reviewerList = await reviewerRepository.findAll();
    interviewerList = await interviewerRepository.findAll();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('interviewer 생성', async () => {
    const createDTO = plainToInstance(CreateInterviewDTO, {
      reviewerId: reviewerList[0].id,
      interviewerId: interviewerList[0].id,
    });

    const response = await controller.create(createDTO);

    expect(response).toBeInstanceOf(Interview);
    expect(response.interviewer.id).toBe(interviewerList[0].id);
    expect(response.reviewer.id).toBe(reviewerList[0].id);
  });

  it('interview 조회', async () => {
    const response = await controller.findAll();

    expect(response.length).toBe(0);
  });
});
