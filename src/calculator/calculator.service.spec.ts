import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';
import { ExpressionParserService } from './expressionParser.service';
import { AppModule } from '../app.module';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [CalculatorService, ExpressionParserService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should calculate the expression correctly', () => {
    expect(service.calculate('2+3*4')).toBe(14);
    expect(service.calculate('(2+3)*4')).toBe(20);
  });
});
