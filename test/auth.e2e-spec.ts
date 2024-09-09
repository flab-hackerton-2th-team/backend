import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { testConfig } from '../src/mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MikroOrmModule.forRoot(testConfig)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/login (POST)', () => {
    it('20자 이름에 대해서 성공한다.', () => {
      const testName = 'a'.repeat(20);

      return request(app.getHttpServer())
        .post('/login')
        .send({ name: testName })
        .expect(200)
        .expect('name', testName);
    });

    it('1자 이름에 대해서 성공한다.', () => {
      const testName = 'a';

      return request(app.getHttpServer())
        .post('/login')
        .send({ name: testName })
        .expect(200)
        .expect('name', testName);
    });

    it('21자 이름에 대해서 실패한다.', () => {
      const testName = 'a'.repeat(21);

      return request(app.getHttpServer())
        .post('/login')
        .send({ name: testName })
        .expect(400);
    });
  });
});
