import { Test, TestingModule } from '@nestjs/testing';
import { ReviwersService } from './reviwers.service';

describe('ReviwersService', () => {
  let service: ReviwersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviwersService],
    }).compile();

    service = module.get<ReviwersService>(ReviwersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
