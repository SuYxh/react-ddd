// uploadService.ts
import { createPlatformService } from './createPlatformService';

export interface UploadService {
  upload(file: File | any): Promise<string>;
}
export const uploadService = createPlatformService<UploadService>('uploadService');
