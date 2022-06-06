import { Test, TestingModule } from '@nestjs/testing';
import { ProductstockService } from './productstock.service';

describe('ProductstockService', () => {
  let service: ProductstockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductstockService],
    }).compile();

    service = module.get<ProductstockService>(ProductstockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
