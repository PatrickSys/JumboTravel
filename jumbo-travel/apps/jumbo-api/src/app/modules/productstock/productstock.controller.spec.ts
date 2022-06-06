import { Test, TestingModule } from '@nestjs/testing';
import { ProductstockController } from './productstock.controller';
import { ProductstockService } from './productstock.service';

describe('ProductstockController', () => {
  let controller: ProductstockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductstockController],
      providers: [ProductstockService],
    }).compile();

    controller = module.get<ProductstockController>(ProductstockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
