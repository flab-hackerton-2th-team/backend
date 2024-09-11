import { Test, TestingModule } from '@nestjs/testing';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { MikroOrmModule, getRepositoryToken } from '@mikro-orm/nestjs';
import { Reviewer } from '../entities/reviewer';
import { testConfig } from '../mikro-orm.config';

describe('InterviewController', () => {
  let controller: InterviewController;
  let reviewerRepository: EntityRepository<Reviewer>;
  let orm: MikroORM;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(testConfig),
        MikroOrmModule.forFeature([Reviewer]),
      ],
      providers: [InterviewService],
      controllers: [InterviewController],
    }).compile();

    controller = module.get<InterviewController>(InterviewController);
    reviewerRepository = module.get<EntityRepository<Reviewer>>(
      getRepositoryToken(Reviewer),
    );
    orm = module.get(MikroORM);
  });

  beforeEach(async () => {
    await orm.getSchemaGenerator().dropSchema();
    await orm.getSchemaGenerator().createSchema();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
