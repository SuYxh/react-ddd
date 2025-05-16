import { Product } from '../../product/domain/Product';

export class DiscountService {
  calculateDiscount(product: Product, level: 'vip' | 'normal'): number {
    if (level === 'vip') {
      return product.price.value * 0.9;
    }
    return product.price.value;
  }
}