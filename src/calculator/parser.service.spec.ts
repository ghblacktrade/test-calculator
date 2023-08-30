import { Test, TestingModule } from '@nestjs/testing';
import { ExpressionParserService } from './expressionParser.service';
import { AppModule } from '../app.module';
import { RegistrationOperator } from "./registrationOperator.service";

describe('ParserService', () => {
  let parserService: ExpressionParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [ExpressionParserService, RegistrationOperator],
    }).compile();

    parserService = module.get<ExpressionParserService>(ExpressionParserService);
  });

  describe('tokenize', () => {
    it('should tokenize expression correctly', () => {
      const expression = '2+3*4+(5-1)';
      const tokens = parserService.tokenize(expression);
      expect(tokens).toEqual(['2', '+', '3', '*', '4', '+', '(', '5', '-', '1', ')']);
    });

    it('should throw an error for invalid expression', () => {
      expect(() => parserService.tokenize('invalid')).toThrowError(
          'Invalid number',
      );
    });
  });

  describe('convertToPostfix', () => {
    it('should convert infix to postfix notation', () => {
      const tokens = ['3', '+', '2', '*', '(', '5', '-', '1', ')'];
      const postfix = parserService.convertToPostfix(tokens);
      expect(postfix).toEqual(['3', '2', '5', '1', '-', '*', '+']);
    });
  });

  describe('evaluatePostfix', () => {
    it('should evaluate postfix expression correctly', () => {
      const postfix = ['3', '2', '5', '1', '-', '*', '+'];
      const result = parserService.evaluatePostfix(postfix);
      expect(result).toEqual(11);
    });
  });

  it('should handle division by zero', () => {
    const postfix = ['4', '2', '0', '-', '*', '/'];
    expect(() => parserService.evaluatePostfix(postfix)).toThrowError(
        'Err: Division zero'
    );
  });

  describe('calculate', () => {
    it('should calculate expression correctly', () => {
      const expression = '2+3*4+(5-1)';
      const result = parserService.calculate(expression);
      expect(result).toEqual(18);
    });

    it('should calculate expression with division by zero', () => {
      const expression = '2-3*4/(5-5)';
      expect(() => parserService.calculate(expression)).toThrowError(
          'Err: Division zero',
      );
    });
  });
});
