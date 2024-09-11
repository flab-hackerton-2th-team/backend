import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Interviewer } from '../entities/interviewer';
import { testConfig } from '../mikro-orm.config';
import { InterviewerDTO } from './dto/Interviewer.dto';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(testConfig),
        MikroOrmModule.forFeature([Interviewer]),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createInterviewer() should return Interviewer', async () => {
    const name = 'testName';
    const result = await controller.createInterviewer({ name });

    expect(result).toBeInstanceOf(InterviewerDTO);
    expect(result.name).toBe(name);
  });
});
