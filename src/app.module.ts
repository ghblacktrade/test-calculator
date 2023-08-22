import { Module } from '@nestjs/common';
import { CalculatorService } from './calculator/calculator.service';
import { ExpressionParserService } from './calculator/expressionParser.service';

@Module({
  providers: [CalculatorService, ExpressionParserService],
})
export class AppModule {}
