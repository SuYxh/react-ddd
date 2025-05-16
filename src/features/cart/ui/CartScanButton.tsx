// ui/CartScanButton.tsx
import { useCartScanWorkflow } from '../application/useCartScanWorkflow';

export const CartScanButton = () => {
  const { scanAndCreateCartItem } = useCartScanWorkflow();

  const handleScan = async () => {
    const item = await scanAndCreateCartItem();
    console.log('✅ 得到购物车项:', item);
    // 可以添加到购物车 state 中
  };

  return <button onClick={handleScan}>📷 扫码加购</button>;
};
