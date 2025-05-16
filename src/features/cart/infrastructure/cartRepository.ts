import { CartItem } from '../domain/CartItem';
import { Product } from '../../product/domain/Product';
import { Price } from '../../product/domain/Price';

const LOCAL_STORAGE_KEY = 'cart_items';

export const CartRepository = {
  save(items: CartItem[]) {
    const raw = items.map((item) => ({
      product: {
        id: item.product.id,
        name: item.product.name,
        price: {
          value: item.product.price.value,
          currency: item.product.price.currency,
        },
      },
      quantity: item.quantity,
      userLevel: item.userLevel,
    }));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(raw));
  },
  load(): CartItem[] {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return parsed.map((item: any) =>
        new CartItem(
          new Product(
            item.product.id,
            item.product.name,
            new Price(item.product.price.value, item.product.price.currency)
          ),
          item.quantity,
          item.userLevel
        )
      );
    } catch {
      return [];
    }
  },

  clear() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  },
};