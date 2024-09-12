import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Interviewer } from '../entities/interviewer';
import { testConfig } from '../mikro-orm.config';
import { InterviewerDTO } from './dto/Interviewer.dto';
import { MikroORM } from '@mikro-orm/sqlite';

describe('AuthController', () => {
  let controller: AuthController;
  let orm: MikroORM;

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
    orm = module.get(MikroORM);
  });

  beforeEach(async () => {
    await orm.getSchemaGenerator().dropSchema();
    await orm.getSchemaGenerator().createSchema();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createInterviewer() should return Interviewer', async () => {
    const name = 'testName';
    const result = await controller.createInterviewer({ name });

    expect(result).toBeInstanceOf(InterviewerDTO);
    expect(result.id).toBeDefined();
    expect(result.name).toBe(name);
  });
});
