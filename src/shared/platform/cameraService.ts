import { createPlatformService } from './createPlatformService';

// cameraService.ts
export interface CameraService {
  takePhoto(): Promise<string>;
}
export const cameraService = createPlatformService<CameraService>('cameraService');
