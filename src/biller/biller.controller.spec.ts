import { Test, TestingModule } from '@nestjs/testing';
import { BillerController } from './biller.controller';

describe('BillerController', () => {
  let controller: BillerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillerController],
    }).compile();

    controller = module.get<BillerController>(BillerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
