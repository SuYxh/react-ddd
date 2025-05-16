import { scanService } from '../scanService';
import { uploadService } from '../uploadService';
import { cameraService } from '../cameraService';

scanService.register({
  scan: async () => {
    const result = window.prompt('请输入模拟扫码结果（PC端）');
    return result || '';
  },
});

uploadService.register({
  upload: async (file: File) => {
    console.log('📤 模拟上传文件:', file);
    return URL.createObjectURL(file); // 本地模拟 URL
  },
});

cameraService.register({
  takePhoto: async () => {
    throw new Error('PC 端未实现拍照功能');
  },
});