export class Price {
  constructor(public value: number, public currency: string) {}

  toString() {
    return `${this.currency} ${this.value.toFixed(2)}`;
  }
}