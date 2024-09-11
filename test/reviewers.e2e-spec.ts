import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Reviewer } from '../src/entities/reviewer';
import { REVIEWER_LIST } from '../src/reviewers/test/reviewers.common';
import { MikroORM } from '@mikro-orm/sqlite';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;
  let reviewerRepository: EntityRepository<Reviewer>;

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

    orm = moduleFixture.get(MikroORM);
    reviewerRepository = moduleFixture.get<EntityRepository<Reviewer>>(
      getRepositoryToken(Reviewer),
    );

    await orm.getSchemaGenerator().dropSchema();
    await orm.getSchemaGenerator().createSchema();
    await Promise.all(
      REVIEWER_LIST.map((reviewer) => reviewerRepository.create(reviewer)),
    );
    await orm.em.flush();
  });

  describe('/reviewers (GET)', () => {
    it('2명의 리뷰어가 생성된다.', async () => {
      const response = await request(app.getHttpServer())
        .get('/reviewers')
        .send()
        .expect(200);

      expect(response.body.length).toEqual(2);
    });
  });
});
