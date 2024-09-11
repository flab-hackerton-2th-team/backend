import { Test, TestingModule } from '@nestjs/testing';
import { InterviewService } from './interview.service';
import { getRepositoryToken, MikroOrmModule } from '@mikro-orm/nestjs';
import { Reviewer } from '../entities/reviewer';
import { testConfig } from '../mikro-orm.config';
import { Interview } from '../entities/interview';
import { EntityRepository, MikroORM } from '@mikro-orm/sqlite';
import { plainToInstance } from 'class-transformer';
import { Interviewer } from '../entities/interviewer';
import { REVIEWER_LIST } from '../../test/fixture/reviewers.common';
import { INTERVIEWER_LIST } from '../../test/fixture/interviewer.common';
import { CreateInterviewDTO } from './dto/createInterview.dto';

describe('InterviewService', () => {
  let service: InterviewService;
  let reviewerRepository: EntityRepository<Reviewer>;
  let interviewerRepository: EntityRepository<Interviewer>;
  let orm: MikroORM;

  let reviewerList: Reviewer[];
  let interviewerList: Interviewer[];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(testConfig),
        MikroOrmModule.forFeature([Reviewer, Interviewer, Interview]),
      ],
      providers: [InterviewService],
    }).compile();

    orm = module.get(MikroORM);
    service = module.get<InterviewService>(InterviewService);
    reviewerRepository = module.get<EntityRepository<Reviewer>>(
      getRepositoryToken(Reviewer),
    );
    interviewerRepository = module.get<EntityRepository<Interviewer>>(
      getRepositoryToken(Interviewer),
    );
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
    expect(service).toBeDefined();
  });

  it('interviewer 생성', async () => {
    const createDTO = plainToInstance(CreateInterviewDTO, {
      reviewerId: reviewerList[0].id,
      interviewerId: interviewerList[0].id,
    });

    const response = await service.create(createDTO);

    expect(response).toBeInstanceOf(Interview);
    expect(response.interviewer.id).toBe(interviewerList[0].id);
    expect(response.reviewer.id).toBe(reviewerList[0].id);
  });
});
