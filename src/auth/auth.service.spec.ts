import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Interviewer } from '../entities/interviewer';
import { CreateInterviewerDTO } from './dto/createInterviewer.dto';
import { plainToInstance } from 'class-transformer';
import { testConfig } from '../mikro-orm.config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot(testConfig)],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('20자 미만, 0자 이상의 입력에 대해서 interviewer를 생성함', async () => {
    const name = 'validName';
    const createDTO = plainToInstance(CreateInterviewerDTO, { name });

    const interviewer = await service.createInterviewer(createDTO);

    expect(interviewer).toBeInstanceOf(Interviewer);
  });
});
