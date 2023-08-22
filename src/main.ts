import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as readline from 'readline';
import { CalculatorService } from './calculator/calculator.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const calculatorService = app.get(CalculatorService);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Введите выражение: ', (expression) => {
    const result = calculatorService.calculate(expression);
    console.log(`Результат: ${result}`);
    rl.close();
    app.close();
  });
}

bootstrap();
