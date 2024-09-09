import { Test, TestingModule } from '@nestjs/testing';
import { ReviwersController } from './reviwers.controller';
import { ReviwersService } from './reviwers.service';

describe('ReviwersController', () => {
  let controller: ReviwersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviwersController],
      providers: [ReviwersService],
    }).compile();

    controller = module.get<ReviwersController>(ReviwersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
