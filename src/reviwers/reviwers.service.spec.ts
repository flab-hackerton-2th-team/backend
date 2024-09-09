import { Test, TestingModule } from '@nestjs/testing';
import { ReviwersService } from './reviwers.service';
import { MikroOrmModule, getRepositoryToken } from '@mikro-orm/nestjs';
import { testConfig } from '../mikro-orm.config';
import { Reviewer } from '../entities/reviewer';
import { EntityRepository } from '@mikro-orm/postgresql';
import { MikroORM } from '@mikro-orm/sqlite';

describe('ReviwersService', () => {
  const REVIEWER_LIST: Partial<Reviewer>[] = [
    {
      presona: {
        name: 'John Doe',
        image:
          'https://images.freeimages.com/images/large-previews/83f/paris-1213603.jpg?fmt=webp&w=500',
        description: 'hello world',
        prompt: 'hello Missing',
      },
    },
    {
      presona: {
        name: 'James Doe',
        image:
          'https://images.freeimages.com/images/large-previews/03e/oxford-architecture-1233371.jpg?fmt=webp&w=500',
        description: 'hello world2',
        prompt: 'hello Missing2',
      },
    },
  ];

  let service: ReviwersService;
  let reviewerRepository: EntityRepository<Reviewer>;
  let orm: MikroORM;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(testConfig),
        MikroOrmModule.forFeature([Reviewer]),
      ],
      providers: [ReviwersService],
    }).compile();

    service = module.get<ReviwersService>(ReviwersService);
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
