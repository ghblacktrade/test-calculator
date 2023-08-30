import {Injectable} from "@nestjs/common";

interface Operator {
    priority: number;
    fn: (a: number, b: number) => number;
}

@Injectable()
export class RegistrationOperator {
    private operators: Record<string, Operator> = {};

    addOperation(symbol: string, operator: Operator) {
        this.operators[symbol] = operator;
    }

    getOperation(symbol: string): Operator | undefined {
        return this.operators[symbol];
    }
}