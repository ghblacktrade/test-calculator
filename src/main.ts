import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as readline from 'readline';
import { ExpressionParserService } from "./calculator/expressionParser.service";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const expressionParserService = app.get(ExpressionParserService);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Введите выражение: ', (expression) => {
    try {
      const result = expressionParserService.calculate(expression);
      console.log(`Результат: ${result}`);
    } catch (error) {
      console.error(`Ошибка: ${error.message}`);
    } finally {
      rl.close();
      app.close();
    }
  });
}

bootstrap();
