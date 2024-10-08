import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken, MikroOrmModule } from '@mikro-orm/nestjs';
import { Interviewer } from '../entities/interviewer';
import { CreateInterviewerDTO } from './dto/createInterviewer.dto';
import { plainToInstance } from 'class-transformer';
import { testConfig } from '../mikro-orm.config';
import { InterviewerDTO } from './dto/Interviewer.dto';
import { MikroORM } from '@mikro-orm/sqlite';

describe('AuthService', () => {
  let service: AuthService;
  let orm: MikroORM;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(testConfig),
        MikroOrmModule.forFeature([Interviewer]),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    orm = module.get(MikroORM);
  });

  beforeEach(async () => {
    await orm.getSchemaGenerator().dropSchema();
    await orm.getSchemaGenerator().createSchema();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('20자 미만, 0자 이상의 입력에 대해서 interviewer를 생성함', async () => {
    const name = 'validName';
    const createDTO = plainToInstance(CreateInterviewerDTO, { name });

    const interviewer = await service.createInterviewer(createDTO);

    expect(interviewer).toBeInstanceOf(InterviewerDTO);
    expect(interviewer.name).toEqual(name);
  });
});
