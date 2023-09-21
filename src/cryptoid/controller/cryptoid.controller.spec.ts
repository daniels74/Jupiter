import { Test, TestingModule } from '@nestjs/testing';
import { CryptoidController } from './cryptoid.controller';

describe('CryptoidController', () => {
  let controller: CryptoidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoidController],
    }).compile();

    controller = module.get<CryptoidController>(CryptoidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
