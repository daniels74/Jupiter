import { Test, TestingModule } from '@nestjs/testing';
import { NftidService } from './nftid.service';

describe('NftidService', () => {
  let service: NftidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftidService],
    }).compile();

    service = module.get<NftidService>(NftidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
