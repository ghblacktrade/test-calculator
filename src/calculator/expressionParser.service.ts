import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpressionParserService {
  private operators = {
    '+': { precedence: 1, fn: (a: number, b: number) => a + b },
    '-': { precedence: 1, fn: (a: number, b: number) => a - b },
    '*': { precedence: 2, fn: (a: number, b: number) => a * b },
    '/': { precedence: 2, fn: (a: number, b: number) => a / b },
  };

  calculate(expression: string): number {
    const tokens = this.tokenize(expression);
    const postfix = this.convertToPostfix(tokens);
    const result = this.evaluatePostfix(postfix);
    return result;
  }

  private tokenize(expression: string): string[] {
    return expression
      .match(/(?:\d+\.\d+|\d+|\+|\-|\*|\/|\(|\))/g)
      .filter((token) => token.trim() !== '');
  }

  private convertToPostfix(tokens: string[]): string[] {
    const outputQueue: string[] = [];
    const operatorStack: string[] = [];

    tokens.forEach((token) => {
      if (this.operators[token]) {
        while (
          operatorStack.length &&
          operatorStack[operatorStack.length - 1] !== '(' &&
          this.operators[operatorStack[operatorStack.length - 1]].precedence >=
            this.operators[token].precedence
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

  private evaluatePostfix(postfix: string[]): number {
    const stack: number[] = [];

    postfix.forEach((token) => {
      if (this.operators[token]) {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(this.operators[token].fn(a, b));
      } else {
        stack.push(parseFloat(token));
      }
    });

    return stack[0];
  }
}
