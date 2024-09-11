import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MikroORM } from '@mikro-orm/core';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;

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
  });

  beforeEach(async () => {
    await orm.getSchemaGenerator().dropSchema();
    await orm.getSchemaGenerator().createSchema();
  });

  describe('/login (POST)', () => {
    it('20자 이름에 대해서 성공한다.', async () => {
      const testName = 'a'.repeat(20);

      const response = await request(app.getHttpServer())
        .post('/login')
        .send({ name: testName })
        .expect(201);

      expect(response.body.name).toEqual(testName);
    });

    it('1자 이름에 대해서 성공한다.', () => {
      const testName = 'a';

      return request(app.getHttpServer())
        .post('/login')
        .send({ name: testName })
        .expect(201);
    });

    it('21자 이름에 대해서 실패한다.', () => {
      const testName = 'a'.repeat(21);

      return request(app.getHttpServer())
        .post('/login')
        .send({ name: testName })
        .expect(400);
    });

    it('0자 이름에 대해서 실패한다.', () => {
      const testName = '';

      return request(app.getHttpServer())
        .post('/login')
        .send({ name: testName })
        .expect(400);
    });

    it('숫자에 대해서 실패한다.', () => {
      const testName = 11;

      return request(app.getHttpServer())
        .post('/login')
        .send({ name: testName })
        .expect(400);
    });
  });
});
