// ui/ProductScanButton.tsx
import { useScanWorkflow } from '../application/useScanWorkflow';

export const ProductScanButton = () => {
  const { scanAndLog } = useScanWorkflow();

  return <button onClick={scanAndLog}>📷 扫码添加商品</button>;
};
