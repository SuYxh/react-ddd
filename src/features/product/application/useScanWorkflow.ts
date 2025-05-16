// application/useScanWorkflow.ts
import { scanService } from '../../../shared/platform/scanService';

export const useScanWorkflow = () => {
  const scanAndLog = async () => {
    try {
      // const result = await scanService.scan();
      const result = await scanService.getImpl().scan();
      console.log('📦 扫码结果:', result);
    } catch (err) {
      console.error('扫码失败:', err);
    }
  };

  return { scanAndLog };
};
