import { Test, TestingModule } from '@nestjs/testing';
import { ExpressionParserService } from './expressionParser.service';
import { AppModule } from '../app.module';

describe('ParserService', () => {
  let service: ExpressionParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [ExpressionParserService],
    }).compile();

    service = module.get<ExpressionParserService>(ExpressionParserService);
  });

  it('should parse and calculate simple expression', () => {
    expect(service.calculate('2+3')).toBe(5);
  });

  it('should handle precedence correctly', () => {
    expect(service.calculate('2+3*4')).toBe(14);
    expect(service.calculate('2*3+4')).toBe(10);
  });

  it('should handle parentheses correctly', () => {
    expect(service.calculate('(2+3)*4')).toBe(20);
    expect(service.calculate('2*(3+4)')).toBe(14);
  });
});
