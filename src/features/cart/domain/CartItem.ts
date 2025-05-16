import { Product } from '../../product/domain/Product';
import { DiscountService } from './DiscountService';

export class CartItem {
  constructor(
    public product: Product,
    public quantity: number = 1,
    public userLevel: 'vip' | 'normal' = 'normal'
  ) {}

  // totalPrice() {
  //   return this.product.price.value * this.quantity;
  // }
  totalPrice(): number {
    const discountService = new DiscountService();
    const discountedUnitPrice = discountService.calculateDiscount(this.product, this.userLevel);
    return discountedUnitPrice * this.quantity;
  }
}