import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @Input() maxValue: number;
  @Output() onCalculate = new EventEmitter<number>();
  currentValue = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.maxValue);
  }

  public getNumber(value: string) {
    console.log(value);
    if (this.waitForSecondNumber) {
      this.currentValue = value;
      this.waitForSecondNumber = false;
    } else {
      this.currentValue === '0' ? this.currentValue = value : this.currentValue += value;

    }
  }

  getDecimal() {
    if (!this.currentValue.includes('.')) {
      this.currentValue += '.';
    }
  }

  private doCalculation(op, secondOp) {
    switch (op) {
      case '+':
        return this.firstOperand += secondOp;
      case '-':
        return this.firstOperand -= secondOp;
      case '*':
        return this.firstOperand *= secondOp;
      case '/':
        return this.firstOperand /= secondOp;
      case '=':
        return secondOp;
    }
  }

  public getOperation(op: string) {
    console.log(op);

    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentValue);

    } else if (this.operator) {
      const result = this.doCalculation(this.operator, Number(this.currentValue))
      this.currentValue = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);
  }

  public clear() {
    this.currentValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
}
