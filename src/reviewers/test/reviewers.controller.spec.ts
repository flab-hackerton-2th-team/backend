import { Test, TestingModule } from '@nestjs/testing';
import { ReviewersController } from '../reviewers.controller';
import { ReviewersService } from '../reviewers.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Reviewer } from 'src/entities/reviewer';
import { testConfig } from 'src/mikro-orm.config';

describe('ReviwersController', () => {
  let controller: ReviewersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(testConfig),
        MikroOrmModule.forFeature([Reviewer]),
      ],
      controllers: [ReviewersController],
      providers: [ReviewersService],
    }).compile();

    controller = module.get<ReviewersController>(ReviewersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/reviewer (GET)', () => {
    it('생성된 전체 ');
  });
});
