import { Test, TestingModule } from '@nestjs/testing';
import { InterviewService } from './interview.service';
import { getRepositoryToken, MikroOrmModule } from '@mikro-orm/nestjs';
import { Reviewer } from '../entities/reviewer';
import { testConfig } from '../mikro-orm.config';
import { Interview } from '../entities/interview';
import { EntityRepository, MikroORM } from '@mikro-orm/sqlite';

describe('InterviewService', () => {
  let service: InterviewService;
  let reviewerRepository: EntityRepository<Reviewer>;
  let orm: MikroORM;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(testConfig),
        MikroOrmModule.forFeature([Reviewer]),
      ],
      providers: [InterviewService],
    }).compile();

    service = module.get<InterviewService>(InterviewService);
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
    expect(service).toBeDefined();
  });
});
