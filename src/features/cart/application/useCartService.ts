import { create } from 'zustand';
import { CartItem } from '../domain/CartItem';
import { Product } from '../../product/domain/Product';
import { EventBus } from '../../../shared/domain-events/EventBus';
import { PRODUCT_ADDED_TO_CART } from '../../../shared/domain-events/ProductAddedToCart';
import { CartRepository } from '../infrastructure/cartRepository';


interface CartState {
  items: CartItem[];
  addToCart: (product: Product, level?: 'vip' | 'normal') => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartService = create<CartState>((set, get) => ({
  items: CartRepository.load(),
  addToCart: (product, level = 'normal') => {
    const existing = get().items.find((item) => item.product.id === product.id);
    let updatedItems: CartItem[];
    if (existing) {
      updatedItems = get().items.map((item) =>
        item.product.id === product.id
          ? new CartItem(product, item.quantity + 1, level)
          : item
      );
    } else {
      updatedItems = [...get().items, new CartItem(product, 1, level)];
    }
    set({ items: updatedItems });
    CartRepository.save(updatedItems);

    console.log('✅ 发布领域事件');
    EventBus.publish({
      type: PRODUCT_ADDED_TO_CART,
      payload: {
        productId: product.id,
        name: product.name,
        time: new Date().toISOString(),
      },
    });
  },
  removeFromCart: (productId) => {
    const updated = get().items.filter((item) => item.product.id !== productId);
    set({ items: updated });
    CartRepository.save(updated);
  },
  clearCart: () => {
    set({ items: [] });
    CartRepository.clear();
  },
}));

// export const useCartService = create<CartState>((set, get) => ({
//   items: [],
//   addToCart: (product, level = 'normal') => {
//     const existing = get().items.find((item) => item.product.id === product.id);
//     if (existing) {
//       set({
//         items: get().items.map((item) =>
//           item.product.id === product.id
//             ? new CartItem(product, item.quantity + 1, level)
//             : item
//         ),
//       });
//     } else {
//       // set({ items: [...get().items, new CartItem(product)] });
//       set({ items: [...get().items, new CartItem(product, 1, level)] });
//     }

//      // ✅ 发布领域事件
//      console.log('✅ 发布领域事件');
//      EventBus.publish({
//       type: PRODUCT_ADDED_TO_CART,
//       payload: {
//         productId: product.id,
//         name: product.name,
//         time: new Date().toISOString(),
//       },
//     });
//   },
//   removeFromCart: (productId) => {
//     set({ items: get().items.filter((item) => item.product.id !== productId) });
//   },
//   clearCart: () => {
//     set({ items: [] });
//   },
// }));