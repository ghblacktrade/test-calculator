import { Module } from '@nestjs/common';
import { ExpressionParserService } from './calculator/expressionParser.service';
import { RegistrationOperator } from "./calculator/registrationOperator.service";

@Module({
  providers: [ExpressionParserService, RegistrationOperator],
})
export class AppModule {}
