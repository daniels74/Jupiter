import { Test, TestingModule } from '@nestjs/testing';
import { CryptoidService } from './cryptoid.service';

describe('CryptoidService', () => {
  let service: CryptoidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoidService],
    }).compile();

    service = module.get<CryptoidService>(CryptoidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
