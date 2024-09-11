import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Reviewer } from '../src/entities/reviewer';
import { REVIEWER_LIST } from './fixture/reviewers.common';
import { Interviewer } from '../src/entities/interviewer';
import { INTERVIEWER_LIST } from './fixture/interviewer.common';
import { InterviewFixture } from './fixture/interview.common';
import { CreateInterviewDTO } from '../src/interview/dto/createInterview.dto';
import { plainToInstance } from 'class-transformer';
import { CreateInterviewContentDTO } from '../src/interview/dto/createInterviewContent.dto';

describe('ReviewerController (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;
  let reviewerRepository: EntityRepository<Reviewer>;
  let interviewerRepository: EntityRepository<Interviewer>;

  let reviewerList: Reviewer[];
  let interviewerList: Interviewer[];

  let interviewFixture: InterviewFixture;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    await app.init();
    orm = moduleFixture.get<MikroORM>(MikroORM);
    reviewerRepository = moduleFixture.get<EntityRepository<Reviewer>>(
      getRepositoryToken(Reviewer),
    );
    interviewerRepository = moduleFixture.get<EntityRepository<Interviewer>>(
      getRepositoryToken(Interviewer),
    );

    interviewFixture = new InterviewFixture(app);
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

  describe('/interview', () => {
    it('POST: interview 생성에 성공한다.', async () => {
      const response = await interviewFixture.create(
        CreateInterviewDTO.from({
          interviewerId: interviewerList[0].id,
          reviewerId: reviewerList[0].id,
        }),
      );

      expect(response.body.reviewer.id).toEqual(reviewerList[0].id.toString());
      expect(response.body.interviewer.id).toEqual(
        interviewerList[0].id.toString(),
      );
    });

    it('GET: interview 조회에 성공한다.', async () => {
      await interviewFixture.create(
        CreateInterviewDTO.from({
          interviewerId: interviewerList[0].id,
          reviewerId: reviewerList[0].id,
        }),
      );

      const response = await interviewFixture.getAll();

      expect(response.body.length).toEqual(1);
    });
  });

  describe('/interview/:id/contents', () => {
    it('POST: interviewContents 생성에 성공한다.', async () => {
      const interview = await interviewFixture.create(
        CreateInterviewDTO.from({
          interviewerId: interviewerList[0].id,
          reviewerId: reviewerList[0].id,
        }),
      );

      const content = 'hello';
      const response = await interviewFixture.createContents(
        interview.body.id,
        plainToInstance(CreateInterviewContentDTO, {
          content,
        }),
      );

      expect(response.status).toBe(201);
      expect(response.body.content).not.toEqual(content);
    });

    it('GET: interviewContents 조회에 성공한다.', async () => {
      const interview = await interviewFixture.create(
        CreateInterviewDTO.from({
          interviewerId: interviewerList[0].id,
          reviewerId: reviewerList[0].id,
        }),
      );

      const content = 'hello';
      await Promise.all(
        Array.from({ length: 2 }).map(() =>
          interviewFixture.createContents(
            interview.body.id,
            plainToInstance(CreateInterviewContentDTO, {
              content,
            }),
          ),
        ),
      );

      const response = await interviewFixture.getAllContents(interview.body.id);

      expect(response.body.length).toEqual(4);
    });
  });
});
