import { useEffect } from 'react';
import { useProductService } from '../application/useProductService';
import { useCartService } from '../../cart/application/useCartService';
export const ProductList = () => {
  const { products, fetchAll } = useProductService();
  const { addToCart } = useCartService();

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      <h2>🛒 商品列表</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price.toString()} {product.isAvailable() ? '✅' : '❌'}
            <button onClick={() => addToCart(product, 'vip')}>添加到购物车</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
