import { Injectable } from '@nestjs/common';
import { RegistrationOperator } from "./registrationOperator.service";

@Injectable()
export class ExpressionParserService {
  constructor(private registrationOperator: RegistrationOperator) {
    this.registrationOperator.addOperation('+', { priority: 1, fn: (a, b) => a + b });
    this.registrationOperator.addOperation('-', { priority: 1, fn: (a, b) => a - b });
    this.registrationOperator.addOperation('*', { priority: 2, fn: (a, b) => a * b });
    this.registrationOperator.addOperation('/', { priority: 2, fn: (a, b) => a / b });
  }

  calculate(expression: string): number {
    const tokens = this.tokenize(expression);
    const postfix = this.convertToPostfix(tokens);
    const result = this.evaluatePostfix(postfix);
    return result;
  }

  tokenize(expression: string): string[] {
    const tokens = expression
        .match(/(?:\d+\.\d+|\d+|\+|\-|\*|\/|\(|\))/g);

    if (!tokens || tokens.length === 0) {
      throw new Error('Invalid number');
    }

    return tokens.filter((token) => token.trim() !== '');
  }

  convertToPostfix(tokens: string[]): string[] {
    const outputQueue: string[] = [];
    const operatorStack: string[] = [];

    tokens.forEach((token) => {
      const tokenOperator = this.registrationOperator.getOperation(token);
      if (tokenOperator) {
        while (
            operatorStack.length &&
            operatorStack[operatorStack.length - 1] !== '(' &&
            this.registrationOperator.getOperation(operatorStack[operatorStack.length - 1]) &&
            this.registrationOperator.getOperation(operatorStack[operatorStack.length - 1]).priority >=
            tokenOperator.priority
            ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token === '(') {
        operatorStack.push(token);
      } else if (token === ')') {
        while (
            operatorStack.length &&
            operatorStack[operatorStack.length - 1] !== '('
            ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.pop();
      } else {
        outputQueue.push(token);
      }
    });


    while (operatorStack.length) {
      outputQueue.push(operatorStack.pop());
    }

    return outputQueue;
  }

  evaluatePostfix(postfix: string[]): number {
    const stack: number[] = [];

    postfix.forEach((token) => {
      const operator = this.registrationOperator.getOperation(token);
      if (operator) {
        const b = stack.pop();
        const a = stack.pop();

        if (token === '/' && b === 0) {
          throw new Error('Err: Division zero');
        }

        stack.push(operator.fn(a, b));
      } else {
        stack.push(parseFloat(token));
      }
    });

    return stack[0];
  }
}