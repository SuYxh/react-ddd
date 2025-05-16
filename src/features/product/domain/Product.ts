export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public price: Price,
  ) {}

  isAvailable(): boolean {
    return this.price.value > 0;
  }
}