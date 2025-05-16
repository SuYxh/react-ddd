// application/useCartScanWorkflow.ts
import { scanService } from '../../../shared/platform/scanService';
import { CartItem } from '../../../features/cart/domain/CartItem';

export const useCartScanWorkflow = () => {
  const scanAndCreateCartItem = async (): Promise<CartItem> => {
    const result = await scanService.getImpl().scan(); // 调用平台能力
    return new CartItem(result, 1); // 构建领域模型
  };

  return { scanAndCreateCartItem };
};
