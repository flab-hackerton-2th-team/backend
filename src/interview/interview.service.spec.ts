import { Test, TestingModule } from '@nestjs/testing';
import { InterviewService } from './interview.service';
import { getRepositoryToken, MikroOrmModule } from '@mikro-orm/nestjs';
import { Reviewer } from '../entities/reviewer';
import { testConfig } from '../mikro-orm.config';
import { Interview } from '../entities/interview';
import { EntityRepository, MikroORM, NotFoundError } from '@mikro-orm/sqlite';
import { plainToInstance } from 'class-transformer';
import { Interviewer } from '../entities/interviewer';
import { REVIEWER_LIST } from '../../test/fixture/reviewers.common';
import { INTERVIEWER_LIST } from '../../test/fixture/interviewer.common';
import { CreateInterviewDTO } from './dto/createInterview.dto';
import { InterviewContents } from '../entities/interviewContents';
import { CreateInterviewContentDTO } from './dto/createInterviewContent.dto';

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
        MikroOrmModule.forFeature([
          Reviewer,
          Interviewer,
          Interview,
          InterviewContents,
        ]),
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

  describe('interview 생성', () => {
    it('정상 요청에 대해서 생성', async () => {
      const createDTO = plainToInstance(CreateInterviewDTO, {
        reviewerId: reviewerList[0].id,
        interviewerId: interviewerList[0].id,
      });

      const response = await service.create(createDTO);

      expect(response).toBeInstanceOf(Interview);
      expect(response.interviewer.id).toBe(interviewerList[0].id);
      expect(response.reviewer.id).toBe(reviewerList[0].id);
    });

    it('reviewerId가 유효하지 않으면 에러 발생', async () => {
      const createDTO = plainToInstance(CreateInterviewDTO, {
        reviewerId: null,
        interviewerId: interviewerList[0].id,
      });

      await expect(async () => await service.create(createDTO)).rejects.toThrow(
        NotFoundError,
      );
    });

    it('interviewerId가 유효하지 않으면 에러 발생', async () => {
      const createDTO = plainToInstance(CreateInterviewDTO, {
        reviewerId: reviewerList[0].id,
        interviewerId: null,
      });

      await expect(async () => await service.create(createDTO)).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('interview findAll', () => {
    it('0개일 경우 빈 array 조회', async () => {
      const response = await service.findAll();

      expect(response.length).toBe(0);
    });

    it('1개일 경우 조회 가능', async () => {
      const interview = await createInterview();

      const response = await service.findAll();

      expect(response.length).toBe(1);
      expect(response.map((item) => item.id)).toContain(interview.id);
    });

    it('interviewer에 관계없이 전체가 조회된다.', async () => {
      await Promise.all([
        createInterview(),
        createInterview(
          CreateInterviewDTO.from({
            reviewerId: reviewerList[0].id,
            interviewerId: interviewerList[1].id,
          }),
        ),
      ]);

      const response = await service.findAll();

      expect(response.length).toBe(2);
    });
  });

  describe('interview findOne', () => {
    it('interview 관련된 contents 포함해서 조회', async () => {
      const interview = await createInterview();

      const response = await service.findOne(interview.id);

      expect(response.id).toBe(interview.id);
      expect(response.contents).toBeInstanceOf(Array);
      expect(response.contents.length).toBe(0);
    });
  });

  describe('interview createContents', () => {
    it('interview 단일 contents생성', async () => {
      const interview = await createInterview();

      const response = await createInterviewContent(interview.id);

      expect(response.id).toBeDefined();
      expect(response.content.length).toBeGreaterThan(0);
    });

    it('interview get 요청시 contents list 응답', async () => {
      const interview = await createInterview();

      await Promise.all(
        Array.from({ length: 2 }).map(() =>
          createInterviewContent(interview.id),
        ),
      );

      const response = await service.findContents(interview.id);

      expect(response.length).toBe(4);
    });
  });

  function createInterview(dto?: CreateInterviewDTO) {
    return service.create(
      dto ??
        CreateInterviewDTO.from({
          reviewerId: reviewerList[0].id,
          interviewerId: interviewerList[0].id,
        }),
    );
  }

  function createInterviewContent(interviewId: bigint) {
    return service.createContents(
      interviewId,
      plainToInstance(CreateInterviewContentDTO, {
        content: 'hello',
      }),
    );
  }
});
