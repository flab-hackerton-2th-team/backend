import { Test, TestingModule } from '@nestjs/testing';
import { ReviewersService } from '../reviewers.service';
import { MikroOrmModule, getRepositoryToken } from '@mikro-orm/nestjs';
import { testConfig } from '../../mikro-orm.config';
import { Reviewer } from '../../entities/reviewer';
import { EntityRepository } from '@mikro-orm/postgresql';
import { MikroORM } from '@mikro-orm/sqlite';
import { REVIEWER_LIST } from './reviewers.common';

describe('ReviwersService', () => {
  let service: ReviewersService;
  let reviewerRepository: EntityRepository<Reviewer>;
  let orm: MikroORM;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(testConfig),
        MikroOrmModule.forFeature([Reviewer]),
      ],
      providers: [ReviewersService],
    }).compile();

    service = module.get<ReviewersService>(ReviewersService);
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

  it('생성된 reviewers를 조회함', async () => {
    // init
    await Promise.all(
      REVIEWER_LIST.map((reviewer) => reviewerRepository.create(reviewer)),
    );
    const result = await service.getAll();

    expect(result.length).toEqual(2);
    expect(result[0].presona.name).toEqual('John Doe');
  });
});
