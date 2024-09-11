import { INestApplication } from '@nestjs/common';
import { CreateInterviewDTO } from '../../src/interview/dto/createInterview.dto';
import * as request from 'supertest';

export class InterviewFixture {
  constructor(private readonly app: INestApplication) {}

  create(dto: CreateInterviewDTO) {
    return request(this.app.getHttpServer())
      .post('/interview')
      .send(dto)
      .expect(201);
  }

  getAll() {
    return request(this.app.getHttpServer()).get('/interview').expect(200);
  }
}
