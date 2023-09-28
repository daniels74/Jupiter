import { Test, TestingModule } from '@nestjs/testing';
import { NftidController } from './nftid.controller';

describe('NftidController', () => {
  let controller: NftidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftidController],
    }).compile();

    controller = module.get<NftidController>(NftidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
