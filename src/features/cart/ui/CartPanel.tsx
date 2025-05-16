import { useCartService } from '../application/useCartService';

export const CartPanel = () => {
  const { items, removeFromCart, clearCart } = useCartService();

  const total = items.reduce((sum, item) => sum + item.totalPrice(), 0);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
      <h2>🧺 购物车</h2>
      <ul>
        {items.map((item) => (
          <li key={item.product.id}>
            {item.product.name} × {item.quantity} = ¥{item.totalPrice()}
            <button onClick={() => removeFromCart(item.product.id)}>移除</button>
          </li>
        ))}
      </ul>
      <p>总价：¥{total}</p>
      <button onClick={clearCart}>清空购物车</button>
    </div>
  );
};