<template>
  <div class="home">
    <div style="color:red;" v-if="error">{{ error }}</div>
    <br/>

    <input v-model.number="operand1" type="number">
    <input v-model.number="operand2" type="number">
    = {{ result }}
    <br/>

    fib(<input v-model.number="operand1" type="number">)
    fib(<input v-model.number="operand2" type="number">)
    = {{ fibResult }} - FIB
    <br/>

    <button v-for="(operand, inx) in operands"
            :key="inx"
            :title="operand"
            @click="calculate(operand)">
      {{ operand }}
    </button>

    <div v-if="result < 0">Отрицательное</div>
    <div v-else-if="result < 100">В первой сотне</div>
    <div v-else>Больше сотни</div>

    <div v-for="(log, key) in logs" :key="key">
      {{ log }}
    </div>

    <div class="home__hw-2">
      <input v-model="isShowKeyboard" type="checkbox" id="chForKeyboard">
      <label for="chForKeyboard">показывать блок с экранной клавиатурой</label>

      <div v-if="isShowKeyboard">
        <button v-for="(btn, key) in buttons"
                :key="key"
                @click="buttonHandler(btn)">{{ btn.name }}
        </button>

        <br>
        <input type="radio" id="radioOperand1"
               :value="operandsEnum.operand1"
               v-model="radioOperand">
        <label for="radioOperand1">operand 1</label>
        <input type="radio" id="radioOperand2"
               :value="operandsEnum.operand2"
               v-model="radioOperand">
        <label for="radioOperand2">operand 2</label>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

interface IButton {
  name: string;
  value?: number;
  type: 'number' | 'backspace'; // string;
}

// eslint-disable-next-line no-shadow
enum operandsEnum {
  operand1 = 'OPERAND1',
  operand2 = 'OPERAND2',
}

@Component({
  name: 'Home',
})
export default class Home extends Vue {
  operand1 = 0;

  operand2 = 0;

  result = 0;

  fibResult = 0;

  operands: string[] = ['+', '-', '*', '/', '**'];

  error = '';

  isShowKeyboard = true;

  radioOperand = 'operand1';

  logs: { [key: string]: string } = {}; // здесь будем хранить наши логи

  operandsEnum = operandsEnum;

  // По нормальному это надо в Utils
  // eslint-disable-next-line class-methods-use-this
  get buttons(): IButton[] {
    const btns: IButton[] = [{
      name: '<-',
      type: 'backspace',
    }];

    // eslint-disable-next-line no-plusplus
    for (let i = 9; i >= 0; i--) {
      btns.unshift({
        name: `${i}`,
        value: i,
        type: 'number',
      });
    }
    return btns;
  }

  get fib1(): number {
    return this.fib(this.operand1);
  }

  get fib2(): number {
    return this.fib(this.operand2);
  }

  // todo: ПЕРЕДЕЛАЮ
  // eslint-disable-next-line class-methods-use-this
  buttonHandler(btn: IButton): void {
    if (!btn?.type) {
      return;
    }

    switch (this.radioOperand) {
      case operandsEnum.operand1:
        // eslint-disable-next-line no-nested-ternary
        this.operand1 = btn.type === 'number'
          ? +`${this.operand1}${btn.value}`
          : btn.type === 'backspace'
            ? +`${this.operand1.toString()}`.substring(0, this.operand1.toString().length - 1)
            : this.operand1;
        break;
      case operandsEnum.operand2:
        // eslint-disable-next-line no-nested-ternary
        this.operand2 = btn.type === 'number'
          ? +`${this.operand2}${btn.value}`
          : btn.type === 'backspace'
            ? +`${this.operand2.toString()}`.substring(0, this.operand2.toString().length - 1)
            : this.operand2;
        break;
      default:
        break;
    }
  }

  fib(n: number): number {
    return n <= 1 ? n : this.fib(n - 1) + this.fib(n - 2);
  }

  calculate(operation: string): void {
    this.error = '';
    switch (operation) {
      case '+':
        this.plus();
        break;

      case '-':
        this.minus();
        break;

      case '*':
        this.multiply();
        break;

      case '/':
        this.divide();
        break;

      case '**':
        this.exponentiation();
        break;

      default:
        break;
    }

    const key = Date.now();
    const value = `${this.operand1} ${operation} ${this.operand2} = ${this.result}`;

    // this.logs[Date.now()] = `${this.operand1}${operation}${this.operand2}=${this.result}`;
    this.$set(this.logs, key, value);
  }

  plus(): void {
    this.result = this.operand1 + this.operand2;
    this.fibResult = this.fib1 + this.fib2;
  }

  minus(): void {
    this.result = this.operand1 - this.operand2;
    this.fibResult = this.fib1 - this.fib2;
  }

  divide(): void {
    if (this.operand2 === 0) {
      this.error = 'На ноль делить нельзя!';
      return;
    }
    this.result = this.operand1 / this.operand2;
    this.fibResult = this.fib1 / this.fib2;
  }

  multiply(): void {
    this.result = this.operand1 * this.operand2;
    this.fibResult = this.fib1 * this.fib2;
  }

  exponentiation(): void {
    this.result = this.operand1 ** this.operand2;
    this.fibResult = this.fib1 ** this.fib2;
  }
}

</script>
