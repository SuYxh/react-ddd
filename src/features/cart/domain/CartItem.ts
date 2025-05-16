import { Product } from '../../product/domain/Product';

export class CartItem {
  constructor(
    public product: Product,
    public quantity: number = 1,
  ) {}

  totalPrice() {
    return this.product.price.value * this.quantity;
  }
}