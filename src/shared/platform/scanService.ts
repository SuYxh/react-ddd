// shared/platform/scanService.ts
import { createPlatformService } from './createPlatformService';

export interface ScanService {
  scan(): Promise<string>;
}

export const scanService = createPlatformService<ScanService>('scanService');
