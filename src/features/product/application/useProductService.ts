import { create } from 'zustand';
import { Product } from '../domain/Product';
import { fetchProducts } from '../infrastructure/productApi';

type ProductState = {
  products: Product[];
  fetchAll: () => Promise<void>;
};

export const useProductService = create<ProductState>((set) => ({
  products: [],
  fetchAll: async () => {
    const data = await fetchProducts();
    set({ products: data });
  },
}));