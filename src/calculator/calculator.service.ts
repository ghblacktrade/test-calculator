import { Injectable } from '@nestjs/common';
import { ExpressionParserService } from './expressionParser.service';

@Injectable()
export class CalculatorService {
  constructor(private expressionParserService: ExpressionParserService) {}

  calculate(expression: string): number {
    return this.expressionParserService.calculate(expression);
  }
}
