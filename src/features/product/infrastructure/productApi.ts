import { Product } from '../domain/Product';
import { Price } from '../domain/Price';

export async function fetchProducts(): Promise<Product[]> {
  // 模拟请求
  const res = [
    { id: '1', name: 'iPhone', price: { value: 6999, currency: '¥' } },
    { id: '2', name: 'MacBook', price: { value: 12999, currency: '¥' } },
  ];
  return res.map(
    (item) => new Product(item.id, item.name, new Price(item.price.value, item.price.currency))
  );
}