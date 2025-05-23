import { Test, TestingModule } from '@nestjs/testing';
import { RevenusService } from './revenus.service';

describe('RevenusService', () => {
  let service: RevenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevenusService],
    }).compile();

    service = module.get<RevenusService>(RevenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
